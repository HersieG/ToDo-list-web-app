import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "./HeroSection";
const HomePage = () => {
  return (
    <div className="h-full flex flex-col">
      <div>
        <Navbar />
      </div>
      <div className="flex-1 h-full">
        <HeroSection />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
