import React from "react";
import TodoList from "../../components/TodoList";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const page = () => {
  return (
    <div className=" bg-bg-900 min-h-screen flex flex-col justify-between items-center">
      <Navbar />
      <main className="w-full flex justify-center place-items-center">
        <TodoList />
      </main>
      <Footer />
    </div>
  );
};

export default page;
