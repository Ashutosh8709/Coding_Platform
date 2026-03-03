import api from "./api";

const getCurrentUser = () => {
  return api.get("/user");
};

const login = (formData) => {
  return api.post("/user/login", formData);
};

const signup = (formData) => {
  return api.post("/user/signup", formData);
};

const logout = () => {
  return api.post("/user/logout");
};

const changePassword = (currentPassword, newPassword) => {
  return api.post("/user/changepassword", { currentPassword, newPassword });
};

const forgotPassword = (email, newPassword) => {
  return api.post("/user/forgotPassword", { email, newPassword });
};

export {
  getCurrentUser,
  login,
  signup,
  logout,
  changePassword,
  forgotPassword,
};
