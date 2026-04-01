import React from "react";
import { useIsTaskCompleted } from "../hooks/useIsTaskCompleted";

const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const PRIORITY_CONFIG = {
  HIGH: {
    label: "High",
    classes: "bg-red-500/10 text-red-400 border border-red-500/20",
  },
  MEDIUM: {
    label: "Medium",
    classes: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  },
  LOW: {
    label: "Low",
    classes: "bg-green-500/10 text-green-400 border border-green-500/20",
  },
};

const TaskCard = ({
  title,
  description,
  completed,
  priority,
  dueDate,
  id,
  onChange,
}) => {
  const { error, updateTaskCompleted } = useIsTaskCompleted(); // ✅ removed completed: isCompleted

  const handleCheckboxChange = async () => {
    const next = !completed; // ✅ use prop, not local state
    onChange(id, next); // ✅ update parent instantly
    await updateTaskCompleted(id, next); // ✅ sync backend
  };

  const priorityConfig = PRIORITY_CONFIG[priority] ?? {};

  return (
    <div
      className={`
      w-full flex flex-col gap-3 p-4 rounded-xl border transition-all duration-200
      bg-base-200 border-base-300 hover:border-base-content/20 hover:shadow-md
      ${completed ? "opacity-60" : ""}
    `}
    >
      <div className="flex items-start justify-between gap-3">
        <label className="flex items-start gap-3 cursor-pointer flex-1 min-w-0">
          <input
            type="checkbox"
            checked={completed} // ✅ controlled by parent
            onChange={handleCheckboxChange}
            className="checkbox checkbox-sm mt-1 shrink-0"
          />
          <span
            className={`font-semibold text-base leading-snug truncate ${
              completed
                ? "line-through text-base-content/40"
                : "text-base-content"
            }`}
          >
            {title}
          </span>
        </label>
        {priority && (
          <span
            className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${priorityConfig.classes}`}
          >
            {priorityConfig.label}
          </span>
        )}
      </div>
      {description && (
        <p className="text-sm text-base-content/60 leading-relaxed pl-7">
          {description}
        </p>
      )}
      <div className="flex items-center justify-between pl-7 pt-2 border-t border-base-300">
        <div className="flex items-center gap-1.5 text-xs text-base-content/40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {formatDate(dueDate)}
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            completed
              ? "bg-green-500/10 text-green-400"
              : "bg-base-300 text-base-content/50"
          }`}
        >
          {completed ? "Completed" : "In Progress"}
        </span>
      </div>
      {error && <p className="text-xs text-red-400 pl-7">{error}</p>}
    </div>
  );
};

export default TaskCard;
