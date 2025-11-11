"use client";
import React, { use } from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const TodolistBlock = ({ onClose, onTaskCreated }) => {
  const { data: session } = useSession();

  // form data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  // const [completed, setCompleted] = useState(false);
  const [priority, setPriority] = useState("MEDIUM");
  // state for tasks
  const [todos, setTodos] = useState([]);

  // state for loading

  const [loading, setLoading] = useState(false);

  // fetching tasks when component loads
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
      setTodos([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          due_date: new Date(dueDate),
          priority: priority,
        }),
      });

      if (response.ok) {
        const newTodo = await response.json();

        setTodos([newTodo, ...todos]);

        if (onTaskCreated) onTaskCreated(newTodo);
        setTitle("");
        setDescription("");
        setDueDate("");
        if (onClose) {
          onClose();
        }
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving task");
    } finally {
      setLoading(false);
    }
  };
  const activePriority = (p) => {
    return p === priority
      ? "text-text  bg-bg-700 shadow-l"
      : "text-text-muted bg-bg-800 shadow-m";
  };

  return (
    <div className=" bg-bg-700 place-self-center p-8 rounded-4xl border border-border m-3">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col place-items-center gap-10 "
      >
        <h2>Create Task</h2>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="textField"
          required
        />
        <label htmlFor="desc">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          rows="4"
          className="textField"
        />
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          placeholder="Enter description"
          required
        />
        <label htmlFor="priority">Priority</label>
        {/* <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">-- Select --</option>
          <option value="option1">HIGH</option>
          <option value="option2">MEDIUM</option>
          <option value="option3">LOW</option>
        </select> */}
        <div className="flex gap-6">
          <button
            type="button"
            value="HIGH"
            onClick={(e) => setPriority(e.target.value)}
            className={`  shadow-m  ${activePriority(
              "HIGH"
            )} p-4 rounded-2xl hover:cursor-pointer transition-all duration-[300ms]`}
          >
            HIGH
          </button>
          <button
            type="button"
            value="MEDIUM"
            onClick={(e) => setPriority(e.target.value)}
            className={`  ${activePriority(
              "MEDIUM"
            )} p-4 rounded-2xl   hover:cursor-pointer transition-all duration-[300ms]`}
          >
            MEDIUM
          </button>
          <button
            type="button"
            value="LOW"
            onClick={(e) => setPriority(e.target.value)}
            className={`  ${activePriority(
              "LOW"
            )} p-4 rounded-2xl   hover:cursor-pointer transition-all duration-[300ms]`}
          >
            LOW
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save Post"}
        </button>
      </form>
    </div>
  );
};

export default TodolistBlock;
