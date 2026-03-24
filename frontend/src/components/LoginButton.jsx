import React from "react";
import { useNavigate } from "react-router-dom";
const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/login")}
      className="bg-bg p-2 rounded-2xl border border-border hover:cursor-pointer"
    >
      Login
    </button>
  );
};

export default LoginButton;
