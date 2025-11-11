import React from "react";
import LoginForm from "./components/LoginForm";
import SignInButton from "./components/sign-in-button";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className=" bg-bg-900 min-h-screen flex flex-col gap-20 justify-center items-center">
      <main className="flex-1 flex flex-col justify-center place-items-center w-full">
        <div className="flex flex-col bg-bg-800 p-6 rounded-2xl shadow-l place-items-center justify-center gap-4">
          <h1 className="sm:text-5xl font-semibold text-text">
            Welcome to ListThat
          </h1>
          <SignInButton />
        </div>
      </main>
      <Footer />
    </div>
  );
}
