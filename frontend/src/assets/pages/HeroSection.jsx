import React from "react";

const HeroSection = () => {
  return (
    <div className="hero bg-base h-full">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Hello there, welcome too
            <section className="text-transparent bg-linear-to-r bg-clip-text from-blue-500 to-purple-500 mt-5 text-7xl">
              ListThat
            </section>
          </h1>
          <p className="py-6">
            A simple way to manage your tasks, track priorities, and get things
            done.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
