import React from "react";
import { useState } from "react";
import { useCreateTask } from "../hooks/useCreateTask";
const PRIORITY_CONFIG = {
  HIGH: {
    label: "High",
    classes: "bg-red-500/10 text-red-400 ",
  },
  MEDIUM: {
    label: "Medium",
    classes: "bg-yellow-500/10 text-yellow-400 ",
  },
  LOW: {
    label: "Low",
    classes: "bg-green-500/10 text-green-400 ",
  },
};

const SELECTED_PRIORITY_CONFIG = {
  HIGH: {
    label: "High",
    classes: "bg-red-500/50 text-red-100 border border-red-500/20",
  },
  MEDIUM: {
    label: "Medium",
    classes: "bg-yellow-500/50 text-yellow-100 border border-yellow-500/20",
  },
  LOW: {
    label: "Low",
    classes: "bg-green-500/40 text-green-100 border border-green-500/20",
  },
};

// TODO: create useStates

const CreateTask = ({ onSuccess, onClose }) => {
  const [priority, setPriority] = useState("MEDIUM");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const { create, loading, error, task } = useCreateTask();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await create({ title, description, dueDate, priority });
    onSuccess();
    onClose();
  };
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Create Task</legend>
        <label className="label">Title</label>
        <input
          type="text"
          className="input"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="label">Description</label>
        <input
          type="text"
          className="input"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="label">Date</label>
        <input
          type="date"
          className="input"
          onChange={(e) => setDueDate(e.target.value)}
        />
        <label className="label">Priority</label>
        <div className="flex flex-row gap-2">
          {Object.keys(PRIORITY_CONFIG).map((p) => {
            const currPriority = PRIORITY_CONFIG[p];
            const currSeclected = SELECTED_PRIORITY_CONFIG[p];
            return (
              <button
                type="button"
                className={`${currPriority.classes}, ${p.toUpperCase() === priority ? currSeclected.classes : ""} w-full h-8`}
                onClick={() => setPriority(p)}
              >
                {currPriority.label}
              </button>
            );
          })}
        </div>
        <button
          disabled={loading || !title || !dueDate}
          className={`btn btn-neutral mt-4 ${loading || !title || !dueDate ? "btn-disabled" : ""}`}
          type="submit"
        >
          Create task
        </button>
      </fieldset>
    </form>
  );
};

export default CreateTask;
