"use client";
import React from "react";
import { useState, useEffect } from "react";
import TodolistBlock from "./TodolistBlock";
import { useSession } from "next-auth/react";
import { PiNotePencilLight } from "react-icons/pi";
import UpdateTodoList from "./UpdateTodo";
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const { data: session, status } = useSession();
  useEffect(() => {
    fetchTodos();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleString("en-US", {
      month: "long", // "January"
      day: "numeric", // 14
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const deleteTodo = async (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
    try {
      const response = await fetch("/api/todos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.error("Error Deleting posts:", error);
    }
  };

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
          onClick={() => setOpenCreate(true)}
        >
          + Create Task
        </button>
        {openCreate && (
          <>
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setOpenCreate(false)}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <TodolistBlock
                onClose={() => setOpenCreate(false)}
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
              <div className="flex-1 flex place-items-center gap-2">
                <button
                  className="w-12 h-8 text-delete bg-delete-bg/10 px-4 py-1 shadow-l rounded-2xl hover:cursor-pointer flex justify-center place-items-center"
                  onClick={() => deleteTodo(t.id)}
                >
                  X
                </button>
                <button
                  className="bg-yellow-700/10 text-yellow-300 w-12 h-8 px-4 py-2 shadow-l rounded-2xl hover:cursor-pointer flex justify-center place-items-center"
                  onClick={() => setEditingTodoId(t.id)}
                >
                  <PiNotePencilLight />
                </button>
              </div>
              <h1 className="flex-1 place-self-center col-span-2  text-center text-xl">
                {t.title}
              </h1>
              <div className="flex-1 flex justify-end">
                <div
                  className={`py-2 px-3 rounded-lg ${priorityColor(
                    t.priority,
                  )} ${priorityColorBg(t.priority)}`}
                >
                  {t.priority}
                </div>
              </div>
            </div>
            <section className="p-4">
              {" "}
              <div>{formatDate(t.due_date)}</div>
              <p>{t.description}</p>
            </section>
          </div>
        );
      })}
      {editingTodoId && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setOpenUpdate(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <UpdateTodoList
              onClose={() => setEditingTodoId(null)}
              onTaskUpdated={(updatedTodo) => {
                setTodos((prev) =>
                  prev.map((todo) =>
                    todo.id === updatedTodo.id ? updatedTodo : todo,
                  ),
                );
              }}
              id={editingTodoId}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
