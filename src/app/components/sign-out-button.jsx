"use client";
import React from "react";
import { logout } from "@/lib/actions/auth.js";

const SignOutButton = () => {
  return (
    <button onClick={() => logout()} className="bg-gray-600 p-40">
      sign out
    </button>
  );
};

export default SignOutButton;
