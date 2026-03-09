import api from "./api";

const getDiscussions = () => {
  return api.get("/discuss");
};

const getDiscussionsProblem = (problemId) => {
  return api.get(`/discuss/problem/${problemId}`);
};

const addDiscussion = (type, problemId, content, title) => {
  if (type === "problem") {
    return api.post(`/discuss/add/${type}`, { problemId, content, title });
  }
  return api.post(`/discuss/add/${type}`, { title, content });
};

const updateDiscussion = (discussionId) => {
  return api.put(`/discuss/update/${discussionId}`, { title, content });
};

const deleteDiscussion = (discussionId) => {
  return api.delete(`/discuss/delete/${discussionId}`);
};

export {
  getDiscussions,
  getDiscussionsProblem,
  addDiscussion,
  updateDiscussion,
  deleteDiscussion,
};
