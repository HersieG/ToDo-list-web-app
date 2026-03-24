import React from "react";
import LogOutButton from "./LogOutButton";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="bg-black p-2 flex justify-between">
      <div>Navbar</div>
      <div>
        {isLoggedIn ? (
          <LogOutButton />
        ) : (
          <div className="flex gap-4">
            <LoginButton />
            <RegisterButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
