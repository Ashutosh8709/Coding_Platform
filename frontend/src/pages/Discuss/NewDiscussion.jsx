import { useState, useRef, useCallback } from "react";

const TAGS = [
  "General",
  "Interview Exp",
  "Tips & Tricks",
  "Bug Report",
  "Feature Request",
  "Study Group",
];

const TAG_COLORS = {
  General:
    "text-gray-500   bg-gray-100    dark:bg-dark-600   dark:text-gray-400  border-gray-200    dark:border-dark-500",
  "Interview Exp": "text-brand-500  bg-brand-500/10  border-brand-500/25",
  "Tips & Tricks": "text-emerald-500 bg-emerald-400/10 border-emerald-400/25",
  "Bug Report": "text-red-400    bg-red-400/10    border-red-400/25",
  "Feature Request": "text-cyan-400   bg-cyan-400/10   border-cyan-400/25",
  "Study Group": "text-yellow-500 bg-yellow-400/10  border-yellow-400/25",
};

/* ─── Toolbar button ─────────────────────────────────────────── */
function ToolBtn({ title, icon, onClick, active }) {
  return (
    <button
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all
        ${
          active
            ? "bg-brand-500/15 text-brand-500"
            : "text-gray-500 dark:text-dark-300 hover:bg-gray-100 dark:hover:bg-dark-600 hover:text-gray-900 dark:hover:text-white"
        }`}
    >
      {icon}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-gray-200 dark:bg-dark-500 mx-1" />;
}

/* ─── Code block component ───────────────────────────────────── */
function CodeBlock({ content, onChange, onDelete }) {
  return (
    <div className="my-3 rounded-xl overflow-hidden border border-gray-200 dark:border-dark-500 group/code">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-dark-600 border-b border-gray-200 dark:border-dark-500">
        <span className="text-xs font-mono font-bold text-gray-400 dark:text-dark-300">
          Code
        </span>
        <button
          onClick={onDelete}
          className="opacity-0 group-hover/code:opacity-100 w-6 h-6 rounded flex items-center justify-center text-xs text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          ✕
        </button>
      </div>
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="// paste your code here..."
        spellCheck={false}
        className="w-full p-4 bg-[#06060f] text-[#c4c2f0] font-mono text-sm leading-relaxed outline-none resize-none min-h-[120px]"
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
      />
    </div>
  );
}

/* ─── Image block ────────────────────────────────────────────── */
function ImageBlock({ src, caption, onCaptionChange, onDelete }) {
  return (
    <div className="my-3 rounded-xl overflow-hidden border border-gray-200 dark:border-dark-500 group/img">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-500">
        <span className="text-xs font-bold text-gray-400 dark:text-dark-300">
          Image
        </span>
        <button
          onClick={onDelete}
          className="opacity-0 group-hover/img:opacity-100 w-6 h-6 rounded flex items-center justify-center text-xs text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          ✕
        </button>
      </div>
      <div className="p-4 bg-white dark:bg-dark-700">
        <img
          src={src}
          alt={caption}
          className="max-w-full rounded-lg max-h-80 object-contain mx-auto block"
        />
        <input
          value={caption}
          onChange={(e) => onCaptionChange(e.target.value)}
          placeholder="Add a caption..."
          className="mt-2 w-full text-xs text-center text-gray-400 dark:text-dark-300 outline-none bg-transparent placeholder-gray-300 dark:placeholder-dark-400"
        />
      </div>
    </div>
  );
}

/* ─── Rich text toolbar actions ─────────────────────────────── */
function execCmd(cmd, value = null) {
  document.execCommand(cmd, false, value);
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════════════ */
export default function NewDiscussion({ onBack, onSubmit }) {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [blocks, setBlocks] = useState([]); // [{type:'code'|'image', content, caption, src, id}]
  const [preview, setPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const blockId = useRef(0);

  /* Insert code block after current cursor in editor */
  const insertCodeBlock = () => {
    const id = ++blockId.current;
    setBlocks((b) => [...b, { id, type: "code", content: "" }]);
    // Insert a placeholder anchor in the contenteditable
    execCmd(
      "insertHTML",
      `<br/><div data-block-id="${id}" class="cf-block-placeholder" style="display:none"></div><br/>`,
    );
  };

  const insertImageBlock = (src) => {
    const id = ++blockId.current;
    setBlocks((b) => [...b, { id, type: "image", src, caption: "" }]);
    execCmd(
      "insertHTML",
      `<br/><div data-block-id="${id}" class="cf-block-placeholder" style="display:none"></div><br/>`,
    );
  };

  const deleteBlock = (id) => {
    setBlocks((b) => b.filter((x) => x.id !== id));
    if (editorRef.current) {
      const el = editorRef.current.querySelector(`[data-block-id="${id}"]`);
      el?.remove();
    }
  };

  const updateBlock = (id, patch) => {
    setBlocks((b) => b.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => insertImageBlock(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) execCmd("createLink", url);
  };

  const getBodyHTML = () => editorRef.current?.innerHTML || "";

  const handleSubmit = async () => {
    if (!title.trim() || !tag) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
    onSubmit?.({ title, tag, body: getBodyHTML(), blocks });
  };

  /* ── Success state ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-900 flex items-center justify-center px-6 pt-14">
        <div className="text-center animate-scale-in max-w-sm">
          <div className="w-16 h-16 gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow-md text-3xl">
            🎉
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
            Posted!
          </h2>
          <p className="text-gray-400 dark:text-dark-300 text-sm mb-8 leading-relaxed">
            Your discussion is now live. The community will love it.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onBack}
              className="px-6 py-2.5 rounded-xl gradient-brand text-white text-sm font-bold hover:shadow-glow-sm transition-all"
            >
              Back to Discuss
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 pt-14">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* ── Header ── */}
        <div className="animate-fade-up flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl border border-gray-200 dark:border-dark-500 flex items-center justify-center text-gray-400 dark:text-dark-300 hover:border-brand-500/50 hover:text-brand-500 transition-all text-sm flex-shrink-0"
          >
            ←
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              New Discussion
            </h1>
            <p className="text-sm text-gray-400 dark:text-dark-300 mt-0.5">
              Share your knowledge with the CodeForge community
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setPreview((p) => !p)}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                preview
                  ? "border-brand-500 bg-brand-500/10 text-brand-500"
                  : "border-gray-200 dark:border-dark-500 text-gray-500 dark:text-dark-300 hover:border-brand-500/40 hover:text-brand-500"
              }`}
            >
              {preview ? "✎ Edit" : "👁 Preview"}
            </button>
          </div>
        </div>

        {!preview ? (
          /* ════════ EDITOR MODE ════════ */
          <div className="animate-fade-up space-y-5">
            {/* Title */}
            <div>
              <label className="block text-[11px] font-black text-gray-400 dark:text-dark-300 uppercase tracking-widest mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your post a clear, descriptive title..."
                maxLength={150}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white text-base font-semibold placeholder-gray-300 dark:placeholder-dark-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 transition-all"
              />
              <p className="text-right text-xs text-gray-300 dark:text-dark-400 mt-1">
                {title.length}/150
              </p>
            </div>

            {/* Tag picker */}
            <div>
              <label className="block text-[11px] font-black text-gray-400 dark:text-dark-300 uppercase tracking-widest mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {TAGS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTag(t === tag ? "" : t)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      tag === t
                        ? TAG_COLORS[t] ||
                          "border-brand-500 bg-brand-500/10 text-brand-500"
                        : "border-gray-200 dark:border-dark-500 text-gray-500 dark:text-dark-300 hover:border-brand-500/40 hover:text-brand-500"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Rich editor card */}
            <div>
              <label className="block text-[11px] font-black text-gray-400 dark:text-dark-300 uppercase tracking-widest mb-2">
                Content
              </label>
              <div className="rounded-2xl border border-gray-200 dark:border-dark-500 overflow-hidden bg-white dark:bg-dark-700 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/15 transition-all">
                {/* ── Toolbar ── */}
                <div className="flex items-center gap-0.5 px-3 py-2 border-b border-gray-200 dark:border-dark-500 bg-gray-50 dark:bg-dark-800 flex-wrap">
                  {/* Text style */}
                  <ToolBtn
                    title="Bold"
                    icon={<strong>B</strong>}
                    onClick={() => execCmd("bold")}
                  />
                  <ToolBtn
                    title="Italic"
                    icon={<em className="font-serif">I</em>}
                    onClick={() => execCmd("italic")}
                  />
                  <ToolBtn
                    title="Underline"
                    icon={<span className="underline">U</span>}
                    onClick={() => execCmd("underline")}
                  />
                  <ToolBtn
                    title="Strikethrough"
                    icon={<span className="line-through">S</span>}
                    onClick={() => execCmd("strikeThrough")}
                  />

                  <Divider />

                  {/* Headings */}
                  <ToolBtn
                    title="Heading 1"
                    icon={<span className="text-xs font-black">H1</span>}
                    onClick={() => execCmd("formatBlock", "H2")}
                  />
                  <ToolBtn
                    title="Heading 2"
                    icon={<span className="text-xs font-bold">H2</span>}
                    onClick={() => execCmd("formatBlock", "H3")}
                  />

                  <Divider />

                  {/* Lists */}
                  <ToolBtn
                    title="Bullet list"
                    icon="≡"
                    onClick={() => execCmd("insertUnorderedList")}
                  />
                  <ToolBtn
                    title="Numbered list"
                    icon="①"
                    onClick={() => execCmd("insertOrderedList")}
                  />

                  <Divider />

                  {/* Quote & code */}
                  <ToolBtn
                    title="Blockquote"
                    icon="❝"
                    onClick={() => execCmd("formatBlock", "BLOCKQUOTE")}
                  />
                  <ToolBtn
                    title="Inline code"
                    icon={<span className="font-mono text-[11px]">`x`</span>}
                    onClick={() => {
                      const sel = window.getSelection();
                      if (sel && !sel.isCollapsed) {
                        const range = sel.getRangeAt(0);
                        const text = range.toString();
                        execCmd(
                          "insertHTML",
                          `<code class="cf-inline-code">${text}</code>`,
                        );
                      }
                    }}
                  />
                  <ToolBtn
                    title="Code block"
                    icon={<span className="font-mono text-[11px]">{"{}"}</span>}
                    onClick={insertCodeBlock}
                  />

                  <Divider />

                  {/* Link & image */}
                  <ToolBtn title="Add link" icon="🔗" onClick={handleLink} />
                  <ToolBtn
                    title="Add image"
                    icon="🖼"
                    onClick={() => fileInputRef.current?.click()}
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageFile}
                    className="hidden"
                  />

                  <Divider />

                  {/* Align */}
                  <ToolBtn
                    title="Align left"
                    icon="⬅"
                    onClick={() => execCmd("justifyLeft")}
                  />
                  <ToolBtn
                    title="Align center"
                    icon="↔"
                    onClick={() => execCmd("justifyCenter")}
                  />
                  <ToolBtn
                    title="Align right"
                    icon="➡"
                    onClick={() => execCmd("justifyRight")}
                  />

                  <div className="flex-1" />

                  {/* Clear */}
                  <ToolBtn
                    title="Clear formatting"
                    icon="✕"
                    onClick={() => execCmd("removeFormat")}
                  />
                </div>

                {/* ── Editable area ── */}
                <div className="relative">
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    data-placeholder="Write something amazing… Share your experience, tips, solutions, or questions. Use the toolbar above to format your post."
                    className="min-h-[280px] p-5 text-gray-800 dark:text-gray-200 text-sm leading-relaxed outline-none cf-editor"
                  />

                  {/* Floating code blocks */}
                  {blocks.map((block) =>
                    block.type === "code" ? (
                      <div key={block.id} className="px-5">
                        <CodeBlock
                          content={block.content}
                          onChange={(v) =>
                            updateBlock(block.id, { content: v })
                          }
                          onDelete={() => deleteBlock(block.id)}
                        />
                      </div>
                    ) : (
                      <div key={block.id} className="px-5">
                        <ImageBlock
                          src={block.src}
                          caption={block.caption}
                          onCaptionChange={(v) =>
                            updateBlock(block.id, { caption: v })
                          }
                          onDelete={() => deleteBlock(block.id)}
                        />
                      </div>
                    ),
                  )}
                </div>

                {/* Word count */}
                <div className="px-5 py-2 border-t border-gray-100 dark:border-dark-600 flex items-center justify-between">
                  <div className="flex gap-3">
                    <button
                      onClick={insertCodeBlock}
                      className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-dark-300 hover:text-brand-500 transition-colors font-medium"
                    >
                      <span className="font-mono">{"{}"}</span> Add code block
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-dark-300 hover:text-brand-500 transition-colors font-medium"
                    >
                      🖼 Add image
                    </button>
                  </div>
                  <span className="text-xs text-gray-300 dark:text-dark-400">
                    Markdown shortcuts supported
                  </span>
                </div>
              </div>
            </div>

            {/* Writing tips */}
            <div className="p-4 rounded-xl border border-brand-500/15 bg-brand-500/4 dark:bg-brand-500/5">
              <p className="text-xs font-black text-brand-500 uppercase tracking-widest mb-2">
                ✨ Writing tips
              </p>
              <ul className="text-xs text-gray-500 dark:text-dark-300 space-y-1 leading-relaxed">
                <li>· Start with context — what problem were you solving?</li>
                <li>· Use code blocks for any code snippets</li>
                <li>· Include examples to make your point clear</li>
                <li>· Keep the title specific and searchable</li>
              </ul>
            </div>

            {/* Submit row */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={onBack}
                className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-dark-500 text-sm font-bold text-gray-500 dark:text-dark-300 hover:border-red-400/50 hover:text-red-400 transition-all"
              >
                Discard
              </button>

              <div className="flex items-center gap-3">
                {(!title.trim() || !tag) && (
                  <span className="text-xs text-gray-400 dark:text-dark-300">
                    {!title.trim() ? "Add a title" : "Pick a category"}
                  </span>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !title.trim() || !tag}
                  className="flex items-center gap-2 px-7 py-2.5 rounded-xl gradient-brand text-white text-sm font-bold hover:shadow-glow-sm hover:-translate-y-px transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                      Publishing...
                    </>
                  ) : (
                    "Publish →"
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ════════ PREVIEW MODE ════════ */
          <div className="animate-fade-up">
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700">
              {/* Tag */}
              {tag && (
                <span
                  className={`inline-flex text-[11px] font-bold px-2.5 py-0.5 rounded-full border mb-4 ${TAG_COLORS[tag]}`}
                >
                  {tag}
                </span>
              )}

              {/* Title */}
              <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                {title || (
                  <span className="text-gray-300 dark:text-dark-400 font-normal italic">
                    No title yet…
                  </span>
                )}
              </h1>

              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-dark-600">
                <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-xs">
                  Y
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    You
                  </p>
                  <p className="text-xs text-gray-400 dark:text-dark-300">
                    Just now
                  </p>
                </div>
              </div>

              {/* Body */}
              <div
                className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 cf-preview"
                dangerouslySetInnerHTML={{
                  __html:
                    editorRef.current?.innerHTML ||
                    '<p class="text-gray-300 dark:text-dark-400 italic">No content yet…</p>',
                }}
              />

              {/* Code blocks in preview */}
              {blocks.map((block) =>
                block.type === "code" && block.content ? (
                  <div
                    key={block.id}
                    className="mt-4 rounded-xl overflow-hidden border border-gray-200 dark:border-dark-500"
                  >
                    <div className="px-4 py-2 bg-gray-100 dark:bg-dark-600 border-b border-gray-200 dark:border-dark-500">
                      <span className="text-xs font-mono font-bold text-gray-400 dark:text-dark-300">
                        Code
                      </span>
                    </div>
                    <pre className="bg-[#06060f] text-[#c4c2f0] font-mono text-sm p-4 overflow-x-auto leading-relaxed">
                      {block.content}
                    </pre>
                  </div>
                ) : block.type === "image" && block.src ? (
                  <div
                    key={block.id}
                    className="mt-4 rounded-xl overflow-hidden border border-gray-200 dark:border-dark-500 p-4 bg-white dark:bg-dark-700"
                  >
                    <img
                      src={block.src}
                      alt={block.caption}
                      className="max-w-full rounded-lg max-h-80 object-contain mx-auto block"
                    />
                    {block.caption && (
                      <p className="text-xs text-center text-gray-400 dark:text-dark-300 mt-2">
                        {block.caption}
                      </p>
                    )}
                  </div>
                ) : null,
              )}
            </div>

            <div className="flex justify-between mt-5">
              <button
                onClick={() => setPreview(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-dark-500 text-sm font-bold text-gray-500 dark:text-dark-300 hover:border-brand-500/40 hover:text-brand-500 transition-all"
              >
                ← Back to edit
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || !title.trim() || !tag}
                className="flex items-center gap-2 px-7 py-2.5 rounded-xl gradient-brand text-white text-sm font-bold hover:shadow-glow-sm hover:-translate-y-px transition-all disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                    Publishing...
                  </>
                ) : (
                  "Publish →"
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Global styles injected for editor content */}
      <style>{`
        .cf-editor:empty::before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          position: absolute;
        }
        .dark .cf-editor:empty::before { color: #4a4870; }
        .cf-editor h2 { font-size: 1.25rem; font-weight: 900; margin: 1rem 0 0.5rem; color: inherit; }
        .cf-editor h3 { font-size: 1.05rem; font-weight: 800; margin: 0.8rem 0 0.4rem; color: inherit; }
        .cf-editor p  { margin: 0.4rem 0; }
        .cf-editor ul { list-style: disc;   padding-left: 1.4rem; margin: 0.5rem 0; }
        .cf-editor ol { list-style: decimal; padding-left: 1.4rem; margin: 0.5rem 0; }
        .cf-editor li { margin: 0.25rem 0; }
        .cf-editor blockquote {
          border-left: 3px solid #8b5cf6;
          padding-left: 1rem;
          margin: 0.75rem 0;
          color: #6b7280;
          font-style: italic;
        }
        .dark .cf-editor blockquote { color: #9ca3af; }
        .cf-inline-code, .cf-editor code {
          background: rgba(139,92,246,0.1);
          color: #8b5cf6;
          padding: 1px 6px;
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8em;
        }
        .cf-editor a { color: #8b5cf6; text-decoration: underline; }
        .cf-preview h2 { font-size: 1.25rem; font-weight: 900; margin: 1rem 0 0.5rem; }
        .cf-preview h3 { font-size: 1.05rem; font-weight: 800; margin: 0.8rem 0 0.4rem; }
        .cf-preview ul  { list-style: disc;    padding-left: 1.4rem; margin: 0.5rem 0; }
        .cf-preview ol  { list-style: decimal; padding-left: 1.4rem; margin: 0.5rem 0; }
        .cf-preview blockquote {
          border-left: 3px solid #8b5cf6;
          padding-left: 1rem;
          margin: 0.75rem 0;
          font-style: italic;
        }
        .cf-preview code {
          background: rgba(139,92,246,0.1);
          color: #8b5cf6;
          padding: 1px 6px;
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8em;
        }
        .cf-preview a { color: #8b5cf6; text-decoration: underline; }
      `}</style>
    </div>
  );
}
