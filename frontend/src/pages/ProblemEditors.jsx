import { useState, useRef, useEffect, useCallback } from "react";
import { Badge, Tag, VerdictBadge } from "../components/Badge";
import { Spinner } from "../components/Spinner";
import { useSubmission } from "../hooks/useSubmission";
import Editor from "@monaco-editor/react";
import { useProblem } from "../hooks/useProblem";
import { useParams, Link } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";

export default function ProblemEditor() {
  const { problemId } = useParams();
  const { problem, loading } = useProblem(problemId);
  const { submitCode, runCode, getUserSubmission } = useSubmission();
  const [submissions, setSubmittions] = useState([]);
  const [lang, setLang] = useState("cpp");
  const [code, setCode] = useState(problem?.execution?.starterCode[lang]);
  const [tab, setTab] = useState("description");
  const [leftW, setLeftW] = useState(45);
  const dragging = useRef(false);
  const [runResult, setRunResult] = useState(null);
  const [runStream, setRunStream] = useState([]);
  const [submitResult, setSubmitResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [outputHeight, setOutputHeight] = useState(260);
  const [outputCollapsed, setOutputCollapsed] = useState(false);
  const COLLAPSED_HEIGHT = 32;

  const verticalDragging = useRef(false);

  const onVerticalMove = useCallback((e) => {
    if (!verticalDragging.current) return;

    const newHeight = window.innerHeight - e.clientY;

    setOutputHeight(Math.max(120, Math.min(500, newHeight)));
  }, []);

  const onVerticalUp = useCallback(() => {
    verticalDragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onVerticalMove);
    window.addEventListener("mouseup", onVerticalUp);

    return () => {
      window.removeEventListener("mousemove", onVerticalMove);
      window.removeEventListener("mouseup", onVerticalUp);
    };
  }, [onVerticalMove, onVerticalUp]);

  useSocket({
    onTestcaseUpdate: (data) => {
      setRunStream((prev) => {
        const exists = prev.find((tc) => tc.id === data.index);

        const updatedCase = {
          id: data.index,
          status: data.verdict, // ⭐ IMPORTANT (store full verdict)
          ok: data.verdict === "PASSED", // keep for UI if you want
          input: exists?.input || "",
          output: data.output || "",
          expected: data.expectedOutput || exists?.expected || "",
          error:
            data.verdict !== "PASSED" && data.verdict !== "WRONG_ANSWER"
              ? data.output || "Execution error"
              : null,
        };

        // UPDATE existing
        if (exists) {
          return prev.map((tc) => (tc.id === data.index ? updatedCase : tc));
        }

        // ADD if not exists
        return [...prev, updatedCase];
      });
    },
    onRunResult: (data) => {
      setRunResult({
        type: data.verdict.toLowerCase(),
        error: data.output || null,
      });
    },
    onSubmissionResult: async (data) => {
      setSubmitResult(data);

      const res = await getUserSubmission(problemId);
      setSubmittions(res.data?.data || []);
    },
    setSubmitting: setSubmitting,
  });

  useEffect(() => {
    setCode(problem?.execution?.starterCode[lang]);
  }, [problem, lang]);

  useEffect(() => {
    if (!problem?.visibleTestCases) return;

    const initial = problem.visibleTestCases.map((tc, i) => ({
      id: i + 1,
      status: "PENDING",
      input: tc.input,
      output: "",
      expected: tc.output,
      error: null,
    }));

    setRunStream(initial);
  }, [problem]);

  useEffect(() => {
    if (!problemId) return;

    const fetchSubmissions = async () => {
      const res = await getUserSubmission(problemId);
      setSubmittions(res.data?.data || []);
    };

    fetchSubmissions();
  }, [problemId]);

  const handleRun = async () => {
    setSubmitting(true);
    setRunResult({ type: "running" });
    setSubmitResult(null);

    setRunStream((prev) =>
      prev.map((tc) => ({
        ...tc,
        ok: null,
        output: "",
      })),
    );

    await runCode(problemId, code);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitResult({ type: "judging" });
    setRunResult(null); // clear bottom panel

    await submitCode(problemId, code);
  };

  const onLang = (l) => {
    setLang(l);
  };

  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return;
    setLeftW(Math.max(28, Math.min(62, (e.clientX / window.innerWidth) * 100)));
  }, []);
  const onMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    !loading && (
      <div className="h-screen bg-white dark:bg-dark-900 flex flex-col pt-14 overflow-hidden font-sans">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 h-11 border-b border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 flex-shrink-0">
          <Link
            to={"/problems"}
            className="text-xs text-gray-400 dark:text-dark-300 hover:text-brand-500 transition-colors font-medium"
          >
            ← Problems
          </Link>
          <span className="text-gray-300 dark:text-dark-500">·</span>
          <span className="text-xs font-bold text-gray-700 dark:text-white">
            {problem.title}
          </span>
          <Badge difficulty={problem.difficulty} />
          <div className="flex-1" />
          <select
            value={lang}
            onChange={(e) => onLang(e.target.value)}
            className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-800 text-gray-700 dark:text-white outline-none cursor-pointer"
          >
            {Object.keys(problem?.execution?.starterCode).map((l) => (
              <option key={l} value={l}>
                {l[0].toUpperCase() + l.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={handleRun}
            disabled={submitting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-gray-200 dark:border-dark-500 text-gray-700 dark:text-white text-xs font-bold hover:border-brand-500/50 hover:bg-brand-500/5 disabled:opacity-50 transition-all"
          >
            {submitting && runResult?.type === "running" ? (
              <Spinner size={3} />
            ) : (
              "▶"
            )}{" "}
            Run
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg gradient-brand text-white text-xs font-bold hover:shadow-glow-sm disabled:opacity-50 transition-all"
          >
            {submitting && runResult?.type === "judging" && (
              <Spinner size={3} />
            )}{" "}
            Submit
          </button>
        </div>

        {/* Split pane */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left */}
          <div
            className="overflow-y-auto flex-shrink-0"
            style={{ width: `${leftW}%` }}
          >
            {/* SUBMIT RESULT PANEL */}
            {submitResult && (
              <div className="p-4 border-b bg-[#111122] text-white">
                {submitResult.verdict === "ACCEPTED" && (
                  <div className="text-emerald-400 font-bold text-sm">
                    ✅ Accepted
                  </div>
                )}

                {submitResult.verdict === "WRONG_ANSWER" && (
                  <div className="text-red-400 font-bold text-sm">
                    ❌ Wrong Answer
                  </div>
                )}

                {submitResult.verdict === "RUNTIME_ERROR" && (
                  <div className="text-red-400 font-bold text-sm">
                    💥 Runtime Error
                  </div>
                )}

                {submitResult.verdict === "TIME_LIMIT_EXCEEDED" && (
                  <div className="text-red-400 font-bold text-sm">
                    ⏳ Time Limit Exceeded
                  </div>
                )}

                {submitResult.verdict === "COMPILE_ERROR" && (
                  <div className="text-red-400 font-bold text-sm">
                    🛑 Compile Error
                  </div>
                )}

                {submitResult.type === "judging" && (
                  <div className="text-yellow-400 font-bold text-sm">
                    ⏳ Judging...
                  </div>
                )}
              </div>
            )}
            <div className="flex border-b border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 sticky top-0 z-10">
              {["description", "solutions", "discuss", "submissions"].map(
                (tb) => (
                  <button
                    key={tb}
                    onClick={() => setTab(tb)}
                    className={`px-5 py-2.5 text-xs font-bold capitalize transition-all border-b-2 -mb-px ${tb === tab ? "text-brand-500 border-brand-500" : "text-gray-400 dark:text-dark-300 border-transparent hover:text-gray-700 dark:hover:text-white"}`}
                  >
                    {tb}
                  </button>
                ),
              )}
            </div>
            <div className="p-6 pb-16 bg-white dark:bg-dark-800">
              {tab === "description" && <DescTab p={problem} />}

              {tab === "solutions" && (
                <div className="text-center py-16 text-gray-400 text-sm">
                  Unlock by submitting a passing answer.
                </div>
              )}

              {tab === "discuss" && (
                <div className="text-center py-16 text-gray-400 text-sm">
                  Community discussions coming soon.
                </div>
              )}

              {tab === "submissions" && (
                <SubmissionsTab submissions={submissions} />
              )}
            </div>
          </div>

          {/* Drag handle */}
          <div
            onMouseDown={() => {
              if (!outputCollapsed) verticalDragging.current = true;
            }}
            className="w-1 h-1 cursor-col-resize hover:bg-brand-500/50 bg-gray-100 dark:bg-dark-600 flex-shrink-0 transition-colors"
          />

          {/* Right */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Editor */}
            <div
              className="flex-grow overflow-hidden "
              style={{
                flexGrow: 1,
                height: outputCollapsed ? "100%" : undefined,
              }}
            >
              <CodeEditor
                value={code}
                onChange={setCode}
                lang={lang}
                runResult={runResult}
              />
            </div>

            {/* DRAG HANDLE */}
            {!outputCollapsed && (
              <div
                onMouseDown={() => (verticalDragging.current = true)}
                className="h-1 cursor-row-resize bg-[#0e0e20] hover:bg-brand-500/50"
              />
            )}

            {/* OUTPUT PANEL */}

            <div
              style={{
                height: outputCollapsed ? COLLAPSED_HEIGHT : outputHeight,
              }}
              className="flex-shrink-0"
            >
              <OutputPanel
                runResult={runResult}
                runStream={runStream}
                onToggleCollapse={() => setOutputCollapsed((p) => !p)}
                collapsed={outputCollapsed}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

function DescTab({ p }) {
  return (
    <>
      <h1 className="text-lg font-black text-gray-900 dark:text-white mb-3 tracking-tight">
        {p.title}
      </h1>
      <div className="flex gap-2 flex-wrap mb-5">
        {/* <Badge difficulty={problem.difficulty} />
        {problem.tags?.map((t) => (
          <Tag key={t} label={t} />
        ))} */}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
        {p.description}
      </p>
      <h3 className="text-[11px] font-black text-brand-500 uppercase tracking-widest mb-3">
        Examples
      </h3>
      {p.visibleTestCases.map((ex, i) => (
        <div
          key={i}
          className="mb-3 p-4 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-500"
        >
          <p className="text-[10px] font-black text-gray-400 dark:text-dark-300 uppercase tracking-widest mb-2">
            Example {i + 1}
          </p>
          <div className="font-mono text-xs leading-relaxed">
            <div>
              <span className="text-gray-400 dark:text-dark-300">Input: </span>
              <span className="text-gray-800 dark:text-white">{ex.input}</span>
            </div>
            <div>
              <span className="text-gray-400 dark:text-dark-300">Output: </span>
              <span className="text-gray-800 dark:text-white">{ex.output}</span>
            </div>
            {ex.explanation && (
              <div>
                <span className="text-gray-400 dark:text-dark-300">
                  Explanation:{" "}
                </span>
                <span className="text-gray-800 dark:text-white">
                  {ex.explanation}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}

      <h3 className="text-[11px] font-black text-brand-500 uppercase tracking-widest mb-3 mt-5">
        Input Format
      </h3>
      {p.inputFormat.map((inp) => (
        <div className="flex gap-2 items-center mb-2">
          <span className="text-brand-500 text-lg leading-none">·</span>
          <span className="font-mono text-xs text-gray-700 dark:text-gray-300">
            {inp}
          </span>
        </div>
      ))}

      <h3 className="text-[11px] font-black text-brand-500 uppercase tracking-widest mb-3 mt-5">
        Output Format
      </h3>
      {p.outputFormat.map((out) => (
        <div className="flex gap-2 items-center mb-2">
          <span className="text-brand-500 text-lg leading-none">·</span>
          <span className="font-mono text-xs text-gray-700 dark:text-gray-300">
            {out}
          </span>
        </div>
      ))}
      <h3 className="text-[11px] font-black text-brand-500 uppercase tracking-widest mb-3 mt-5">
        Constraints
      </h3>
      {p.constraints.map((cons) => (
        <div className="flex gap-2 items-center mb-2">
          <span className="text-brand-500 text-lg leading-none">·</span>
          <span className="font-mono text-xs text-gray-700 dark:text-gray-300">
            {cons}
          </span>
        </div>
      ))}
    </>
  );
}

function CodeEditor({ value, onChange, lang, runResult }) {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  function extractCompilerErrors(errorText) {
    if (!errorText) return [];

    // matches:
    // user_code:7:9: error: message
    const regex = /([\w.-]+):(\d+):(\d+):\s+(error|warning):\s+(.*)/g;

    const errors = [];

    let match;

    while ((match = regex.exec(errorText)) !== null) {
      errors.push({
        file: match[1],
        line: Number(match[2]),
        column: Number(match[3]),
        type: match[4],
        message: match[5],
      });
    }

    return errors;
  }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // ⭐ LEETCODE STYLE THEME
    monaco.editor.defineTheme("leetcode-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [{ token: "", background: "06060f" }],
      colors: {
        "editor.background": "#06060f",
        "editorLineNumber.foreground": "#2d2b48",
        "editorCursor.foreground": "#ffffff",
        "editor.lineHighlightBackground": "#0e0e20",
        "editor.selectionBackground": "#2a2a40",
      },
    });

    monaco.editor.setTheme("leetcode-dark");

    // ⭐ LEETCODE EDITOR SETTINGS
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 13.5,
      fontFamily: "JetBrains Mono, monospace",
      lineHeight: 22,
      cursorBlinking: "smooth",
      cursorSmoothCaretAnimation: true,
      smoothScrolling: true,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      padding: { top: 12, bottom: 12 },
      tabSize: 4,
      insertSpaces: true,
      wordWrap: "on",
      renderLineHighlight: "all",
      scrollbar: {
        verticalScrollbarSize: 6,
        horizontalScrollbarSize: 6,
      },
    });

    // ⭐ KEY SHORTCUTS LIKE LEETCODE
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      console.log("Run intilised by keyboard");
    });
  }

  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    if (runResult?.type === "compile_error" && runResult?.error) {
      const parsed = extractCompilerErrors(runResult.error).filter(
        (e) => e.file === "user_code",
      ); // ⭐ KEY FIX

      const markers = parsed.map((err) => ({
        startLineNumber: err.line,
        startColumn: 1,
        endLineNumber: err.line,
        endColumn: 9999,
        message: err.message,
        severity:
          err.type === "warning"
            ? monacoRef.current.MarkerSeverity.Warning
            : monacoRef.current.MarkerSeverity.Error,
      }));

      monacoRef.current.editor.setModelMarkers(model, "compiler", markers);

      if (parsed.length > 0) {
        editorRef.current.revealLineInCenter(parsed[0].line);
      }
    } else {
      monacoRef.current.editor.setModelMarkers(model, "compiler", []);
    }
  }, [runResult]);
  return (
    <div className="relative h-full bg-[#06060f] flex">
      <Editor
        height="100%"
        language={lang}
        value={value}
        onChange={(v) => onChange(v || "")}
        onMount={handleEditorDidMount}
        options={{
          quickSuggestions: true,
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: "on",
          tabCompletion: "on",
          formatOnPaste: true,
          formatOnType: true,
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
        }}
      />
    </div>
  );
}

function OutputPanel({ runResult, runStream, collapsed, onToggleCollapse }) {
  const [activeCase, setActiveCase] = useState(0);
  const current = runStream?.[activeCase];

  return (
    <div className="h-full border-t flex flex-col bg-[#06060f] text-white">
      {/* HEADER */}
      <div className="px-4 py-2 border-b text-sm font-bold">
        <button
          onClick={onToggleCollapse}
          className="ml-auto text-xs text-gray-400 hover:text-white"
        >
          {collapsed ? "▲ Expand" : "▼ Collapse"}
        </button>
        {runResult?.type === "accepted" && (
          <span className="text-emerald-400">Accepted</span>
        )}

        {runResult?.type === "wrong_answer" && (
          <span className="text-red-400">Wrong Answer</span>
        )}

        {runResult?.type === "runtime_error" && (
          <span className="text-red-400">Runtime Error</span>
        )}

        {runResult?.type === "compile_error" && (
          <span className="text-red-400">Compile Error</span>
        )}

        {runResult?.type === "time_limit_exceeded" && (
          <span className="text-red-400">Time Limit Exceeded</span>
        )}

        {runResult?.type === "running" && (
          <span className="text-yellow-400">Running...</span>
        )}
      </div>

      {/* TABS */}
      <div className="flex gap-2 px-4 py-2 border-b">
        {runStream.map((tc, i) => (
          <button
            key={tc.id}
            onClick={() => setActiveCase(i)}
            className={`px-3 py-1 rounded text-xs font-bold ${
              i === activeCase ? "bg-[#2a2a40]" : ""
            }`}
          >
            <span className={tc.ok ? "text-emerald-400" : "text-red-400"}>
              {tc.ok === null
                ? "•"
                : tc.status === "PASSED"
                  ? "✓"
                  : tc.status === "PENDING"
                    ? "•"
                    : "✗"}
            </span>{" "}
            Case {tc.id}
          </button>
        ))}
      </div>

      {/* DETAILS */}
      <div className="flex-1 overflow-auto p-4 space-y-4 text-sm">
        {/* FIRST LOAD STATE */}
        {!runResult && (
          <div className="text-gray-400 text-xs">
            Run code to see testcase results
          </div>
        )}

        {/* COMPILE ERROR */}
        {runResult?.type === "compile_error" && (
          <Block title="Compiler Output" value={runResult.error} />
        )}

        {/* NORMAL TESTCASE VIEW */}
        {runResult &&
          runResult.type !== "compile_error" &&
          current &&
          (current.error ? (
            <Block title="Error" value={current.error} />
          ) : (
            <>
              <Block title="Input" value={current.input} />
              <Block title="Output" value={current.output} />
              <Block title="Expected" value={current.expected} />
            </>
          ))}
      </div>
    </div>
  );
}

function Block({ title, value }) {
  return (
    <div>
      <p className="text-gray-400 text-xs mb-1">{title}</p>
      <div className="bg-[#2a2a40] rounded p-3 font-mono">{value || "-"}</div>
    </div>
  );
}

function SubmissionsTab({ submissions }) {
  if (!submissions || submissions.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 text-sm">
        No submissions yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {submissions.map((sub) => (
        <div
          key={sub._id}
          className="p-4 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-500 flex justify-between items-center"
        >
          <div className="flex flex-col">
            <span className="text-xs font-bold">
              {sub.language?.toUpperCase() || "CPP"}
            </span>
            <span className="text-[10px] text-gray-400">
              {new Date(sub.createdAt).toLocaleString()}
            </span>
          </div>

          <div>
            {sub.verdict === "ACCEPTED" && (
              <span className="text-emerald-400 text-xs font-bold">
                Accepted
              </span>
            )}

            {sub.verdict === "WRONG_ANSWER" && (
              <span className="text-red-400 text-xs font-bold">
                Wrong Answer
              </span>
            )}

            {sub.verdict === "RUNTIME_ERROR" && (
              <span className="text-red-400 text-xs font-bold">
                Runtime Error
              </span>
            )}

            {sub.verdict === "TIME_LIMIT_EXCEEDED" && (
              <span className="text-red-400 text-xs font-bold">
                Time Limit Exceeded
              </span>
            )}

            {sub.verdict === "COMPILE_ERROR" && (
              <span className="text-red-400 text-xs font-bold">
                Compile Error
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
