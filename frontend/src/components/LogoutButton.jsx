import React from "react";
import useLogout from "../hooks/useLogout";
import { useAuth } from "../context/AuthContext";
const LogOutButton = () => {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="bg-bg p-2 rounded-2xl border border-border hover:cursor-pointer"
    >
      Logout
    </button>
  );
};

export default LogOutButton;
