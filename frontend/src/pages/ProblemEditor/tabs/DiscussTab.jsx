import { useState, useRef } from "react";
import DiscussPost from "../../../components/DiscussPost";
import NewPostComposer from "../../../components/NewPostComposer";
import { useProblemDiscussion } from "../../../hooks/useProblemDiscussion";

export default function DiscussTab({ loading, discussions }) {
  const [posts, setPosts] = useState(discussions);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Top");
  const { deleteDiscuss } = useProblemDiscussion();

  /* Like a post */
  const handleLike = (postId) => {
    setPosts((p) =>
      p.map((post) =>
        post.id === postId ? { ...post, liked: !post.liked } : post,
      ),
    );
  };

  const handleDelete = async (discussinId) => {
    try {
      await deleteDiscuss(discussinId);

      setPosts((prev) => prev.filter((post) => post._id !== discussinId));
    } catch (error) {
      console.error(error);
    }
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
              handleDeleteDiscussion={handleDelete}
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
