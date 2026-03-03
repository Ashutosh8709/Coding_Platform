import { useState, useRef, useEffect, useCallback } from "react";
import EditorHeader from "./editor/EditorHeader";
import CodeEditor from "./editor/CodeEditor";
import OutputPanel from "./editor/OutputPanel";
import ProblemTab from "./tabs/ProblemTab";

function ProblemLayout({
  problem,
  runResult,
  submitResult,
  submissions,
  submitting,
  runStream,
  handleRun,
  handleSubmit,
}) {
  // =============================
  // Language + Code
  // =============================
  const [lang, setLang] = useState("cpp");
  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(problem?.execution?.starterCode?.[lang] || "");
  }, [problem, lang]);

  // =============================
  // Horizontal Resize
  // =============================
  const [leftW, setLeftW] = useState(45);
  const dragging = useRef(false);

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

  // =============================
  // Vertical Resize
  // =============================
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

  // =============================
  // Layout Render
  // =============================

  return (
    <div className="h-screen bg-white dark:bg-dark-900 flex flex-col pt-14 overflow-hidden font-sans">
      <EditorHeader
        problem={problem}
        lang={lang}
        setLang={setLang}
        submitting={submitting}
        runResult={runResult}
        onRun={() => handleRun(code)}
        onSubmit={() => handleSubmit(code)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL */}
        <div
          className="overflow-y-auto flex-shrink-0"
          style={{ width: `${leftW}%` }}
        >
          <ProblemTab
            problem={problem}
            submissions={submissions}
            submitResult={submitResult}
          />
        </div>

        {/* DRAG HANDLE */}
        <div
          onMouseDown={() => (dragging.current = true)}
          className="w-1 cursor-col-resize bg-gray-200 hover:bg-brand-500/50"
        />

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Editor */}
          <div className="flex-grow overflow-hidden">
            <CodeEditor
              value={code}
              onChange={setCode}
              lang={lang}
              runResult={runResult}
            />
          </div>

          {/* Vertical Drag */}
          {!outputCollapsed && (
            <div
              onMouseDown={() => (verticalDragging.current = true)}
              className="h-1 cursor-row-resize bg-[#0e0e20] hover:bg-brand-500/50"
            />
          )}

          {/* Output */}
          <div
            style={{
              height: outputCollapsed ? COLLAPSED_HEIGHT : outputHeight,
            }}
            className="flex-shrink-0"
          >
            <OutputPanel
              runResult={runResult}
              runStream={runStream}
              collapsed={outputCollapsed}
              onToggleCollapse={() => setOutputCollapsed((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemLayout;
