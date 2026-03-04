import api from "./api";

const getDraft = (problemId, language) => {
  return api.get(`/draft/${problemId}?language=${language}`);
};

const addDraft = (problemId, language, code) => {
  return api.post(`/draft/${problemId}?language=${language}`, { code });
};

const deleteDraft = (problemId, language) => {
  return api.delete(`/draft/${problemId}?language=${language}`);
};

export { getDraft, addDraft, deleteDraft };
