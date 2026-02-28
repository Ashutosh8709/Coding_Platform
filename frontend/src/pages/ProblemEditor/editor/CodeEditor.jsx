import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Editor from "@monaco-editor/react";

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

export default CodeEditor;
