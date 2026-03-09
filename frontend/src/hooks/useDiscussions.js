import { useEffect, useState } from "react";
import {
  getDiscussions,
  getDiscussionsProblem,
  updateDiscussion,
  deleteDiscussion,
  addDiscussion,
} from "../services/discuss.service";

export const useDiscussion = () => {
  const [discussions, setDiscussions] = useState([]);
  const [problemDiscussions, setProblemDiscussions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        setLoading(true);
        const res = await getDiscussions();
        setDiscussions(res?.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, []);

  const addDiscuss = async (type, title, content) => {
    const res = await addDiscussion(type, title, content);
    setDiscussions((prev) => prev.push(res.data?.data || ""));
  };

  const updateDiscuss = async (discussionId, title, content) => {
    const res = await updateDiscussion(discussionId, title, content);
  };

  const deleteDiscuss = async (discussionId) => {
    await deleteDiscussion(discussionId);
  };

  return { discussions, addDiscuss, updateDiscuss, deleteDiscuss, loading };
};
