import api from "./api";

const addReplyAPI = (discussionId, content) => {
  return api.post(`/reply/add/${discussionId}`, { content });
};

const getReplyAPI = (discussionId) => {
  return api.get(`/reply/${discussionId}`);
};

const deleteReplyAPI = (replyId) => {
  return api.delete(`/reply/delete/${replyId}`);
};

const updateReplyAPI = (replyId, content) => {
  return api.put(`/reply/update/${replyId}`, { content });
};
export { addReplyAPI, getReplyAPI, deleteReplyAPI, updateReplyAPI };
