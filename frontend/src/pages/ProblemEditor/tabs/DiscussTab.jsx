import { useState, useRef } from "react";
import { formatDistanceToNow } from "date-fns";

const LANG_COLORS = {
  javascript: "text-yellow-400 bg-yellow-400/10 border-yellow-400/25",
  python: "text-blue-400   bg-blue-400/10   border-blue-400/25",
  java: "text-orange-400 bg-orange-400/10 border-orange-400/25",
  cpp: "text-cyan-400   bg-cyan-400/10   border-cyan-400/25",
};

/* ─── Toolbar button ─────────────────────────────────────────── */
function ToolBtn({ title, children, onClick }) {
  return (
    <button
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className="w-7 h-7 rounded flex items-center justify-center text-xs text-gray-400 dark:text-dark-300 hover:bg-gray-100 dark:hover:bg-dark-600 hover:text-gray-700 dark:hover:text-white transition-all"
    >
      {children}
    </button>
  );
}

/* ─── Single discussion post ─────────────────────────────────── */
function DiscussPost({ post, onLike, onReplyLike, problemTitle }) {
  const [expanded, setExpanded] = useState(true);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [localReplies, setLocalReplies] = useState(post.replies);
  const replyRef = useRef(null);

  const submitReply = () => {
    if (!replyText.trim()) return;
    const newReply = {
      id: Date.now(),
      author: "You",
      avatar: "Y",
      time: "just now",
      body: replyText,
      likes: 0,
      liked: false,
    };
    setLocalReplies((p) => [...p, newReply]);
    setReplyText("");
    setReplyOpen(false);
  };

  return (
    <div className="border border-gray-200 dark:border-dark-500 rounded-2xl overflow-hidden bg-white dark:bg-dark-700 hover:border-brand-500/25 transition-all">
      {/* Post header */}
      <div className="flex items-start gap-3 p-4 pb-3">
        <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
          {post.username[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {post.username}
            </span>
            <span className="text-xs text-gray-400 dark:text-dark-300">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-0.5 leading-snug">
            {post.title}
          </p>
        </div>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-gray-300 dark:text-dark-400 hover:text-brand-500 text-xs transition-colors flex-shrink-0 mt-1"
        >
          {expanded ? "▲" : "▼"}
        </button>
      </div>

      {expanded && (
        <>
          {/* Body */}
          <div className="px-4 pb-3">
            <div className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {post.content}
            </div>

            {/* Code block */}
            {post.code && (
              <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 dark:border-dark-500">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-dark-600 border-b border-gray-200 dark:border-dark-500">
                  <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-dark-300 uppercase tracking-wider">
                    Code
                  </span>
                </div>
                <pre className="bg-[#06060f] text-[#c4c2f0] font-mono text-[11.5px] leading-relaxed p-3 overflow-x-auto">
                  {post.code}
                </pre>
              </div>
            )}
          </div>

          {/* Actions row */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-t border-gray-100 dark:border-dark-600">
            {/* Like */}
            <button
              onClick={() => onLike(post._id)}
              className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border transition-all ${
                post.liked
                  ? "text-brand-500 bg-brand-500/10 border-brand-500/30"
                  : "text-gray-400 dark:text-dark-300 border-transparent hover:border-brand-500/25 hover:text-brand-500 hover:bg-brand-500/5"
              }`}
            >
              <span>{post.liked ? "♥" : "♡"}</span>
              <span>{post.likes + (post.liked ? 1 : 0)}</span>
            </button>

            {/* Reply */}
            <button
              onClick={() => setReplyOpen((o) => !o)}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-400 dark:text-dark-300 hover:text-brand-500 transition-colors px-2 py-1 rounded-lg hover:bg-brand-500/5"
            >
              💬{" "}
              {localReplies?.length > 0
                ? `${localReplies.length} replies`
                : "Reply"}
            </button>

            <div className="flex-1" />
            <span className="text-[10px] text-gray-300 dark:text-dark-400">
              Report
            </span>
          </div>

          {/* Replies */}
          {localReplies?.length > 0 && (
            <div className="border-t border-gray-100 dark:border-dark-600 bg-gray-50 dark:bg-dark-800/50">
              {localReplies.map((r, i) => (
                <div
                  key={r.id}
                  className={`flex gap-3 px-4 py-3 ${i < localReplies.length - 1 ? "border-b border-gray-100 dark:border-dark-600" : ""}`}
                >
                  <div className="w-6 h-6 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0 mt-0.5">
                    {r.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-800 dark:text-white">
                        {r.author}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-dark-300">
                        {r.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {r.body}
                    </p>
                    <button
                      onClick={() => onReplyLike(post.id, r.id)}
                      className={`mt-1.5 flex items-center gap-1 text-[10px] font-bold transition-all ${
                        r.liked
                          ? "text-brand-500"
                          : "text-gray-400 dark:text-dark-300 hover:text-brand-500"
                      }`}
                    >
                      {r.liked ? "♥" : "♡"} {r.likes + (r.liked ? 1 : 0)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Inline reply box */}
          {replyOpen && (
            <div className="border-t border-gray-100 dark:border-dark-600 p-3 bg-gray-50 dark:bg-dark-800/50">
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0 mt-1">
                  Y
                </div>
                <div className="flex-1">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    rows={2}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-dark-300 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 transition-all resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.metaKey) submitReply();
                    }}
                  />
                  <div className="flex justify-end gap-2 mt-1.5">
                    <button
                      onClick={() => {
                        setReplyOpen(false);
                        setReplyText("");
                      }}
                      className="text-[10px] font-semibold text-gray-400 dark:text-dark-300 hover:text-red-400 transition-colors px-2 py-1"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={submitReply}
                      disabled={!replyText.trim()}
                      className="text-[10px] font-bold px-3 py-1 rounded-lg gradient-brand text-white hover:shadow-glow-sm disabled:opacity-40 transition-all"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ─── New discussion composer (bottom panel) ─────────────────── */
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

/* ═══════════════════════════════════════════════════════════════
  MAIN EXPORT — drop this in as the discuss tab
════════════════════════════════════════════════════════════════ */
export default function DiscussTab({ loading, discussions }) {
  const [posts, setPosts] = useState(discussions);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Top");

  /* Like a post */
  const handleLike = (postId) => {
    setPosts((p) =>
      p.map((post) =>
        post.id === postId ? { ...post, liked: !post.liked } : post,
      ),
    );
  };

  /* Like a reply */
  const handleReplyLike = (postId, replyId) => {
    setPosts((p) =>
      p.map((post) =>
        post.id !== postId
          ? post
          : {
              ...post,
              replies: post.replies.map((r) =>
                r.id === replyId ? { ...r, liked: !r.liked } : r,
              ),
            },
      ),
    );
  };

  /* Add a new post */
  const handleNewPost = ({ title, body, code }) => {
    const newPost = {
      id: Date.now(),
      author: "You",
      avatar: "Y",
      time: "just now",
      title,
      body,
      code: code || null,
      lang: code ? "javascript" : null,
      likes: 0,
      liked: false,
      replies: [],
    };
    setPosts((p) => [newPost, ...p]);
  };

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase()) ||
      p.username.toLowerCase().includes(search.toLowerCase()),
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Top") return b.likes - a.likes;
    if (sortBy === "New") return b.id - a.id;
    if (sortBy === "Replies") return b.replies.length - a.replies.length;
    return 0;
  });

  return (
    <div className="flex flex-col h-full bg-white dark:bg-dark-800">
      {/* ── Sticky top controls ── */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3 space-y-2.5">
        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none">
            🔍
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search discussions..."
            className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-dark-300 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 transition-all"
          />
        </div>

        {/* Sort pills + count */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {["Top", "New", "Replies"].map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                  sortBy === s
                    ? "border-brand-500 bg-brand-500/10 text-brand-500"
                    : "border-transparent text-gray-400 dark:text-dark-300 hover:text-brand-500 hover:bg-brand-500/5"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-gray-400 dark:text-dark-300">
            {sorted.length} posts
          </span>
        </div>
      </div>

      {/* ── Post list (scrollable) ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-2 space-y-3">
        {sorted.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-2xl mb-2">💬</p>
            <p className="text-sm font-semibold text-gray-400 dark:text-dark-300">
              No discussions yet
            </p>
            <p className="text-xs text-gray-300 dark:text-dark-400 mt-1">
              Be the first to start one!
            </p>
          </div>
        ) : (
          sorted.map((post) => (
            <DiscussPost
              key={post._id}
              post={post}
              onLike={handleLike}
              onReplyLike={handleReplyLike}
              problemTitle={discussions.title}
            />
          ))
        )}
      </div>

      {/* ── Sticky bottom composer ── */}
      <NewPostComposer
        problemTitle={discussions.title}
        onPost={handleNewPost}
      />
    </div>
  );
}
