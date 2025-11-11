"use client";
import React from "react";
import { useState, useEffect } from "react";
import TodolistBlock from "./TodolistBlock";
import { useSession } from "next-auth/react";
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();

      setTodos(Array.isArray(data) ? data : data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  const priorityColor = (p) => {
    if (p === "HIGH") {
      return "text-high-900";
    } else if (p === "MEDIUM") {
      return "text-medium-900";
    } else if (p === "LOW") {
      return "text-low-900";
    }
    return "";
  };

  const priorityColorBg = (p) => {
    if (p === "HIGH") {
      return "bg-high-800/10 p-2 rounded-2xl";
    } else if (p === "MEDIUM") {
      return "bg-medium-800/10 p-2 rounded-2xl";
    } else if (p === "LOW") {
      return "bg-low-800/10 p-2 rounded-2xl";
    }
    return "";
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchTodos();
    }
  }, [status]);
  return (
    <div className="bg-bg-800 p-8 border border-border rounded-3xl flex flex-col gap-6 w-[80%] min-h-[60vh] m-8">
      <div className="flex justify-end">
        <button
          className="bg-bg-600 shadow-s p-4 rounded-2xl active:shadow-m hover:cursor-pointer active:scale-95"
          onClick={() => setOpen(true)}
        >
          +Create Task
        </button>
        {open && (
          <>
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <TodolistBlock
                onClose={() => setOpen(false)}
                onTaskCreated={(newTodo) => setTodos([newTodo, ...todos])}
              />
            </div>
          </>
        )}
      </div>
      {todos.map((t) => {
        return (
          <div key={t.id} className="bg-bg-700 flex flex-col rounded-2xl">
            <div className="bg-bg-600 mb-4 p-2 flex justify-between items-center rounded-t-2xl shadow-m">
              <div className="flex-1"></div>
              <h1 className="flex-1 place-self-center col-span-2  text-center">
                {t.title}
              </h1>

              <div className="flex-1 flex justify-end">
                <div
                  className={`py-2 px-3 rounded-lg ${priorityColor(
                    t.priority
                  )} ${priorityColorBg(t.priority)}`}
                >
                  {t.priority}
                </div>
              </div>
            </div>
            <section className="p-4">
              {" "}
              <div>{t.due_date}</div>
              <p>{t.description}</p>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
