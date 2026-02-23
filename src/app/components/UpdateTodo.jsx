"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const UpdateTodoList = ({ onClose, id, onTaskUpdated }) => {
  const { data: session } = useSession();

  // form data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // fetch task when component loads
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await fetch(`/api/todos/${id}`);
        const data = await res.json();

        // set fields AFTER data arrives
        setTitle(data.title || "");
        setDescription(data.description || "");
        setDueDate(data.due_date?.slice(0, 10) || ""); // format date for input
        setPriority(data.priority || "MEDIUM");
      } catch (err) {
        console.error("Failed to fetch todo:", err);
      } finally {
        setIsFetching(false);
      }
    };

    if (id) fetchTodo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/todos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          description,
          due_date: new Date(dueDate),
          priority,
        }),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        onTaskUpdated(updatedTodo);
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating task");
    } finally {
      setLoading(false);
    }
  };

  const activePriority = (p) => {
    return p === priority
      ? "text-text bg-bg-700 shadow-l"
      : "text-text-muted bg-bg-800 shadow-m";
  };

  if (isFetching) return <div className="text-text">Loading…</div>;

  return (
    <div className="bg-bg-700 place-self-center p-8 rounded-4xl border border-border m-3">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col place-items-center gap-10"
      >
        <div className="flex w-full">
          <div className="flex-1"></div>
          <h2 className="flex-1 flex justify-center place-items-center">
            Update Task
          </h2>
          <div className="flex-1 flex justify-end place-items-center">
            <button
              type="button"
              className="bg-bg-600 shadow-l p-3 rounded-xl hover:cursor-pointer"
              onClick={onClose}
            >
              X
            </button>
          </div>
        </div>

        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="textField"
          required
        />

        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textField"
        />

        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        <label>Priority</label>
        <div className="flex gap-6">
          {["HIGH", "MEDIUM", "LOW"].map((p) => (
            <button
              key={p}
              type="button"
              value={p}
              onClick={() => setPriority(p)}
              className={`p-4 rounded-2xl hover:cursor-pointer ${activePriority(
                p
              )}`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-bg-600 text-text px-6 py-2 rounded-2xl shadow-l"
        >
          {loading ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default UpdateTodoList;
