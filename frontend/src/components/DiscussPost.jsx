import { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../context/AuthContext";
import { useReply } from "../hooks/useReply";

function DiscussPost({
  post,
  onLike,
  onReplyLike,
  problemTitle,
  handleDeleteDiscussion,
}) {
  const [expanded, setExpanded] = useState(true);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [localReplies, setLocalReplies] = useState(post.replies);
  const replyRef = useRef(null);
  const { user } = useAuth();
  const { addReply, deleteReply, updateReply } = useReply();
  const [editingReplyId, setEditingReplyId] = useState(null);

  useEffect(() => {
    setLocalReplies(post.replies);
  }, [post.replies]);

  const submitReply = async (discussionId) => {
    try {
      if (editingReplyId) {
        const res = await updateReply(editingReplyId, replyText);

        const updatedContent = res.data?.data?.content;

        setLocalReplies((prev) =>
          prev.map((r) =>
            r._id === editingReplyId ? { ...r, content: updatedContent } : r,
          ),
        );
        setEditingReplyId(null);
      } else {
        const res = await addReply(discussionId, replyText);
        const newReply = res.data?.data;
        setLocalReplies((prev) => [newReply, ...prev]);
      }
      setReplyText("");
      setReplyOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReply = async (replyId) => {
    try {
      await deleteReply(replyId);
      setLocalReplies((prev) => prev.filter((reply) => reply._id !== replyId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditDiscussion = () => {
    console.log("edit discussion", post._id);
  };

  // reply actions

  const handleEditReply = (replyId) => {
    const reply = localReplies.find((r) => r._id === replyId);

    if (!reply) return;

    setReplyText(reply.content);
    setEditingReplyId(replyId);
    setReplyOpen(true);
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
        <div className="flex items-center gap-2">
          {user?._id === post.userId && (
            <>
              <button
                onClick={handleEditDiscussion}
                className="text-[10px] text-gray-400 dark:text-dark-300 hover:text-brand-500 transition-colors"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteDiscussion(post._id)}
                className="text-[10px] text-gray-400 dark:text-dark-300 hover:text-red-400 transition-colors"
              >
                Delete
              </button>
            </>
          )}

          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-gray-300 dark:text-dark-400 hover:text-brand-500 text-xs transition-colors flex-shrink-0 mt-1"
          >
            {expanded ? "▲" : "▼"}
          </button>
        </div>
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
                post.votes
                  ? "text-brand-500 bg-brand-500/10 border-brand-500/30"
                  : "text-gray-400 dark:text-dark-300 border-transparent hover:border-brand-500/25 hover:text-brand-500 hover:bg-brand-500/5"
              }`}
            >
              <span>{post.votes ? "⬆" : "♡"}</span>
              <span>{post.votes + (post.votes ? 1 : 0)}</span>
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
                  key={r._id}
                  className={`flex gap-3 px-4 py-3 ${i < localReplies.length - 1 ? "border-b border-gray-100 dark:border-dark-600" : ""}`}
                >
                  <div className="w-6 h-6 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0 mt-0.5">
                    {r.username[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-800 dark:text-white">
                        {r.username}
                      </span>

                      <span className="text-[10px] text-gray-400 dark:text-dark-300">
                        {formatDistanceToNow(new Date(r.createdAt), {
                          addSuffix: true,
                        })}
                      </span>

                      {user?._id === r.userId && (
                        <div className="flex items-center gap-2 ml-2">
                          <button
                            onClick={() => handleEditReply(r._id)}
                            className="text-[10px] text-gray-400 dark:text-dark-300 hover:text-brand-500 transition-colors"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteReply(r._id)}
                            className="text-[10px] text-gray-400 dark:text-dark-300 hover:text-red-400 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {r.content}
                    </p>
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
                  {user.name[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    rows={2}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-dark-300 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 transition-all resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.metaKey) submitReply(post._id);
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
                      onClick={() => submitReply(post._id)}
                      disabled={!replyText.trim()}
                      className="text-[10px] font-bold px-3 py-1 rounded-lg gradient-brand text-white hover:shadow-glow-sm disabled:opacity-40 transition-all"
                    >
                      {editingReplyId ? "Update" : "Reply"}
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

export default DiscussPost;
