import React from "react";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="hero bg-base h-full">
      <div className="hero-content text-center px-4">
        <div className="max-w-md">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Hello there, welcome too
            <section className="text-transparent bg-linear-to-r bg-clip-text from-blue-500 to-purple-500 mt-5 text-4xl sm:text-5xl md:text-7xl tracking-wide">
              ListThat
            </section>
          </h1>
          <p className="py-6">
            A simple way to manage your tasks, track priorities, and get things
            done.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="btn btn-primary w-full sm:w-auto"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
