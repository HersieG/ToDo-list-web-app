"use client";
import React from "react";
import TodolistBlock from "@/app/components/TodolistBlock";
import { useSession } from "next-auth/react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
const page = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-col flex-1 justify-center place-items-center">
          <p className="font-bold text-4xl">
            Hello {session.user?.name.split(" ")[0]}!
          </p>
          {console.log(session.user?.image)}
          <img src={session.user?.image} height={100} width={100}></img>

          <br />
          <TodolistBlock />
        </div>
        <Footer />
      </div>
    );
  }
  return <div>NOT LOGGED IN</div>;
};

export default page;
