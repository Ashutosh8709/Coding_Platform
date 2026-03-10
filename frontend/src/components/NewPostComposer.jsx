import React, { useState, useRef } from "react";
import ToolBtn from "./ToolBtn";

function NewPostComposer({ problemTitle, onPost }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [posting, setPosting] = useState(false);
  const editorRef = useRef(null);

  const execCmd = (cmd, val = null) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  };

  const handlePost = async () => {
    if (!title.trim()) return;
    setPosting(true);
    await new Promise((r) => setTimeout(r, 900));
    onPost({ title, body: editorRef.current?.innerText || "", code });
    setTitle("");
    setBody("");
    setCode("");
    if (editorRef.current) editorRef.current.innerHTML = "";
    setShowCode(false);
    setOpen(false);
    setPosting(false);
  };

  if (!open) {
    return (
      <div className="sticky bottom-0 left-0 right-0 border-t border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 p-3">
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-500 text-sm text-gray-400 dark:text-dark-300 hover:border-brand-500/40 hover:text-brand-500 hover:bg-brand-500/3 transition-all text-left"
        >
          <div className="w-6 h-6 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0">
            Y
          </div>
          <span className="flex-1 text-xs">
            Start a new discussion about this problem...
          </span>
          <span className="text-xs font-bold text-brand-500 border border-brand-500/30 bg-brand-500/8 px-2 py-0.5 rounded-lg">
            + Post
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 border-t border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_-8px_32px_rgba(0,0,0,0.4)]">
      {/* Composer header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-dark-600">
        <span className="text-xs font-black text-gray-700 dark:text-white tracking-tight">
          New Discussion
        </span>
        <button
          onClick={() => setOpen(false)}
          className="text-gray-400 dark:text-dark-300 hover:text-red-400 text-xs transition-colors w-6 h-6 rounded flex items-center justify-center hover:bg-red-400/10"
        >
          ✕
        </button>
      </div>

      <div className="p-3 space-y-2.5">
        {/* Title input */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title — what's your discussion about?"
          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-800 text-xs font-semibold text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-dark-300 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 transition-all"
        />

        {/* Rich text area */}
        <div className="rounded-xl border border-gray-200 dark:border-dark-500 overflow-hidden focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/15 transition-all">
          {/* Mini toolbar */}
          <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-gray-100 dark:border-dark-600 bg-gray-50 dark:bg-dark-800 flex-wrap">
            <ToolBtn title="Bold" onClick={() => execCmd("bold")}>
              {" "}
              <strong className="text-[11px]">B</strong>
            </ToolBtn>
            <ToolBtn title="Italic" onClick={() => execCmd("italic")}>
              {" "}
              <em className="text-[11px] font-serif">I</em>
            </ToolBtn>
            <ToolBtn title="Underline" onClick={() => execCmd("underline")}>
              {" "}
              <span className="text-[11px] underline">U</span>
            </ToolBtn>
            <div className="w-px h-4 bg-gray-200 dark:bg-dark-500 mx-1" />
            <ToolBtn
              title="Bullet list"
              onClick={() => execCmd("insertUnorderedList")}
            >
              <span className="text-[11px]">≡</span>
            </ToolBtn>
            <ToolBtn
              title="Numbered list"
              onClick={() => execCmd("insertOrderedList")}
            >
              {" "}
              <span className="text-[11px]">①</span>
            </ToolBtn>
            <div className="w-px h-4 bg-gray-200 dark:bg-dark-500 mx-1" />
            <ToolBtn
              title="Inline code"
              onClick={() =>
                execCmd(
                  "insertHTML",
                  `<code style="background:rgba(139,92,246,0.1);color:#8b5cf6;padding:1px 5px;border-radius:4px;font-family:monospace;font-size:0.82em">code</code>`,
                )
              }
            >
              <span className="font-mono text-[10px]">`x`</span>
            </ToolBtn>
            <ToolBtn
              title="Toggle code block"
              onClick={() => setShowCode((s) => !s)}
            >
              <span className="font-mono text-[10px]">{"{}"}</span>
            </ToolBtn>
            <div className="flex-1" />
            <span className="text-[9px] text-gray-300 dark:text-dark-400 pr-1">
              ⌘↵ to post
            </span>
          </div>

          {/* Editable body */}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            data-placeholder="Write your discussion… explain your approach, ask a question, or share a tip."
            className="cf-discuss-editor min-h-[80px] max-h-[140px] overflow-y-auto p-3 text-xs text-gray-800 dark:text-gray-200 leading-relaxed outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.metaKey) handlePost();
            }}
          />
        </div>

        {/* Code block toggle */}
        {showCode && (
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-dark-500">
            <div className="flex items-center justify-between px-3 py-1.5 bg-gray-100 dark:bg-dark-600 border-b border-gray-200 dark:border-dark-500">
              <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-dark-300 uppercase tracking-wider">
                Code Block
              </span>
              <button
                onClick={() => {
                  setShowCode(false);
                  setCode("");
                }}
                className="text-[10px] text-gray-400 hover:text-red-400 transition-colors"
              >
                ✕
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// paste your code here..."
              rows={5}
              spellCheck={false}
              className="w-full p-3 bg-[#06060f] text-[#c4c2f0] font-mono text-[11.5px] leading-relaxed outline-none resize-none"
            />
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setShowCode((s) => !s)}
              className={`text-[10px] font-semibold flex items-center gap-1 px-2 py-1 rounded-lg border transition-all ${
                showCode
                  ? "border-brand-500/40 text-brand-500 bg-brand-500/8"
                  : "border-gray-200 dark:border-dark-500 text-gray-400 dark:text-dark-300 hover:border-brand-500/30 hover:text-brand-500"
              }`}
            >
              <span className="font-mono">{"{}"}</span> Code
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(false)}
              className="text-[10px] font-semibold text-gray-400 dark:text-dark-300 hover:text-red-400 transition-colors px-2 py-1"
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              disabled={posting || !title.trim()}
              className="flex items-center gap-1.5 text-[10px] font-bold px-4 py-1.5 rounded-lg gradient-brand text-white hover:shadow-glow-sm disabled:opacity-40 transition-all"
            >
              {posting ? (
                <>
                  <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin inline-block" />{" "}
                  Posting…
                </>
              ) : (
                "Post Discussion →"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Editor styles */}
      <style>{`
        .cf-discuss-editor:empty::before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        .dark .cf-discuss-editor:empty::before { color: #4a4870; }
        .cf-discuss-editor ul { list-style: disc; padding-left: 1.2rem; }
        .cf-discuss-editor ol { list-style: decimal; padding-left: 1.2rem; }
        .cf-discuss-editor a  { color: #8b5cf6; text-decoration: underline; }
      `}</style>
    </div>
  );
}

export default NewPostComposer;
