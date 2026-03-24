import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const RegisterButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/register")}
      className="btn border border-border hover:cursor-pointer hover:border-white"
    >
      Register
    </button>
  );
};

export default RegisterButton;
