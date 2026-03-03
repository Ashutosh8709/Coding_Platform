import api from "./api";

const getDashBoard = () => {
  return api.get(`/dashboard`);
};

export { getDashBoard };
