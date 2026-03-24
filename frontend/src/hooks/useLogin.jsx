import { useState } from "react";
import { login as loginApi } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { login } = useAuth();
  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginApi({ email, password });
      console.log("Login successful, received token:", response.data.token);
      login(response.data.token); // Store token in context
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};

export default useLogin;
