import api from "./api";

const getAllProblems = (page, limit) => {
  return api.get(`/problem?page=${page}&limit=${limit}`);
};

const getProblemById = (problemId) => {
  return api.get(`/problem/${problemId}`);
};

const addProblem = (formData) => {
  return api.post("/problem/addProblem", { formData });
};

export { getAllProblems, getProblemById, addProblem };
