// context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import {
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
} from "../api/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginApi({ email, password });
      localStorage.setItem("token", response.token);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await logoutApi();
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ name, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerApi({ name, email, password });
      localStorage.setItem("token", response.token);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loading,
        error,
        login,
        logout,
        register,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
