import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await login({ email, password });
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
