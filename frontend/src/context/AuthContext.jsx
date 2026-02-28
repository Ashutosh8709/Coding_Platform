import { useContext, createContext, useState, useEffect } from "react";
import {
  getCurrentUser,
  login,
  signup,
  logout,
  changePassword,
  forgotPassword,
} from "../services/auth.service";
import { handleSuccess, handleError } from "../utils/toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLoggedOut, setUserLoggedOut] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data.data);
      setUserLoggedOut(false);
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
      } else {
        console.error("Error fetching user:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const loginUser = async (formData) => {
    try {
      setLoading(true);
      const res = await login(formData);
      setUser(res.data?.data);
      setUserLoggedOut(false);
      handleSuccess(res.data?.message);
      return true;
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      handleError(message);
    } finally {
      setLoading(false);
    }
  };

  const signupUser = async (formData) => {
    try {
      if (formData.password !== formData.confirmPassword) {
        return handleError("Password and Confirm Password does not match");
      }
      setLoading(true);
      const res = await signup(formData);
      setUser(res.data?.data);
      handleSuccess(res.data?.message);
      return true;
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      handleError(message);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      const res = await logout();
      setUser(null);
      setUserLoggedOut(true);
      handleSuccess(res.data?.message);
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      handleError(message);
    }
  };

  const forgotUserPassword = async (email, newPassword, confirmNewPassword) => {
    try {
      if (newPassword !== confirmNewPassword) {
        return handleError("Password and Confirm Password does not match");
      }
      const res = await forgotPassword(email, newPassword);
      handleSuccess(res.data?.message);
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      handleError(message);
    }
  };

  const changeUserPassword = async (currentPassword, newPassword) => {
    try {
      const res = await changePassword(currentPassword, newPassword);
      handleSuccess(res.data.message);
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      handleError(message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userLoggedOut,
        setUserLoggedOut,
        loginUser,
        signupUser,
        logoutUser,
        forgotUserPassword,
        changeUserPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
