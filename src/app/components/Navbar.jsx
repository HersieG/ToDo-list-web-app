"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
const navLinks = [
  {
    name: "settings",
    link: "/settings",
  },
];

const Navbar = () => {
  return (
    <div className=" flex text-text text-center place-content-center bg-bg-700 text-2xl m-0 p-3 h-fit w-full sticky gap-4">
      <div className="flex gap-4">
        <button
          onClick={() => signOut({ redirectTo: "/" })}
          className="bg-bg-700 border-border hover:cursor-pointer p-4 rounded-2xl shadow-m "
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
