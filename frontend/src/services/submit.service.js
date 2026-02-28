import api from "./api";

const submitByProblemId = (problemId, code) => {
  return api.post(`/submit/${problemId}`, { code });
};

const runByProblemId = (problemId, code) => {
  return api.post(`/submit/run/${problemId}`, { code });
};

const getSubmissionByUserAndProblem = (problemId) => {
  return api.get(`/submit/${problemId}`);
};

export { submitByProblemId, runByProblemId, getSubmissionByUserAndProblem };
