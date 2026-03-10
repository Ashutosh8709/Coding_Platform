import {
  addReplyAPI,
  deleteReplyAPI,
  getReplyAPI,
  updateReplyAPI,
} from "../services/reply.service";

export const useReply = () => {
  const addReply = async (discussionId, content) => {
    return await addReplyAPI(discussionId, content);
  };

  const getReply = async (discussionId) => {
    return await getReplyAPI(discussionId);
  };

  const deleteReply = async (replyId) => {
    return await deleteReplyAPI(replyId);
  };

  const updateReply = async (replyId, content) => {
    return await updateReplyAPI(replyId, content);
  };

  return { addReply, getReply, deleteReply, updateReply };
};
