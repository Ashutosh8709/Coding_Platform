import { useEffect, useState } from "react";
import {
  getDiscussionsProblem,
  updateDiscussion,
  deleteDiscussion,
  addDiscussion,
} from "../services/discuss.service";

export const useProblemDiscussion = (problemId) => {
  const [problemDiscussions, setProblemDiscussions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProblemDiscussions = async () => {
      try {
        setLoading(true);
        const res = await getDiscussionsProblem(problemId);
        setProblemDiscussions(res?.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblemDiscussions();
  }, [problemId]);

  const addDiscuss = async (type, title, content) => {
    const res = await addDiscussion(type, title, content);
    setProblemDiscussions((prev) => prev.push(res.data?.data || ""));
  };

  const updateDiscuss = async (discussionId, title, content) => {
    const res = await updateDiscussion(discussionId, title, content);
  };

  const deleteDiscuss = async (discussionId) => {
    await deleteDiscussion(discussionId);
  };

  return {
    problemDiscussions,
    addDiscuss,
    updateDiscuss,
    deleteDiscuss,
    loading,
  };
};
