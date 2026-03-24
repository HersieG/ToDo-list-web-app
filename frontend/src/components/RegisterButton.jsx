import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const RegisterButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/register")}
      className="bg-bg p-2 rounded-2xl border border-border hover:cursor-pointer"
    >
      Register
    </button>
  );
};

export default RegisterButton;
