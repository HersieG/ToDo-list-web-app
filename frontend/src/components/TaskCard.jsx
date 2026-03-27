import React from "react";
import { useState, useEffect } from "react";
import { useIsTaskCompleted } from "../hooks/useIsTaskCompleted";
const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
};

const priorityColor = (p) => {
  if (p === "HIGH") {
    return "text-high-900 font-bold tracking-widest";
  } else if (p === "MEDIUM") {
    return "text-medium-900 font-bold tracking-widest";
  } else if (p === "LOW") {
    return "text-low-900 font-bold tracking-widest";
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

const TaskCard = ({ title, description, completed, priority, dueDate, id }) => {
  const prettyDate = formatDate(dueDate);
  const [isChecked, setIsChecked] = useState(false);

  const {
    completed: isCompleted,
    error,
    updateTaskCompleted,
  } = useIsTaskCompleted();

  const handleCheckboxChange = async () => {
    setIsChecked(!isChecked);
    // Here you would also want to make an API call to update the task's completed status in the backend
    await updateTaskCompleted(id, !isChecked);
  };

  useEffect(() => {
    if (isCompleted) {
      setIsChecked(true);
    }
  }, [isCompleted]);
  return (
    <div className="flex flex-col bg-black m-3 p-3 rounded-2xl border-4 border-border h-[20vh] w-[100vh]">
      <div className="flex justify-between place-items-center border-b border-border pb-2">
        <h1 className="text-2xl">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange} // ✅ use onChange, not onClick
            className="checkbox border border-border mr-4"
          />
          {title}
        </h1>

        <div className={priorityColorBg(priority)}>
          <section className={priorityColor(priority)}>{priority}</section>
        </div>
      </div>

      <div className="text-text-muted flex-1">
        <p className="mt-6">{description}</p>
      </div>

      <div className="flex justify-between">
        <div>{prettyDate}</div>
        <section>
          {isChecked ? (
            <p className="bg-[#262624] p-2 rounded-2xl">Completed</p>
          ) : (
            <p className="bg-[#262624] p-2 rounded-2xl">Not Completed</p>
          )}
        </section>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TaskCard;
