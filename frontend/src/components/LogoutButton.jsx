import React from "react";
import useLogout from "../hooks/useLogout";
import { useAuth } from "../context/AuthContext";
const LogOutButton = () => {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="btn border border-border hover:cursor-pointer hover:border-white"
    >
      Logout
    </button>
  );
};

export default LogOutButton;
