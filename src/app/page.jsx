"use client";

import Image from "next/image";
import Navbar from "./components/Navbar.jsx";
import TodolistBlock from "./components/TodolistBlock.jsx";
import { signIn } from "@/auth.js";
export default function Home() {
  return (
    <div className="">
      <div>
        {" "}
        <p>You are not signed in</p>{" "}
        <button onClick={() => signIn("github")} className="bg-gray-600 p-40">
          sign in with github
        </button>
      </div>
    </div>
  );
}
