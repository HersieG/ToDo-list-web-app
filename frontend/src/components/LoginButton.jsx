import React from "react";
import { useNavigate } from "react-router-dom";
const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/login")}
      className="btn border border-border hover:cursor-pointer hover:border-white"
    >
      Login
    </button>
  );
};

export default LoginButton;
