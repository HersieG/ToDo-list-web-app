import React from "react";

const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
};

const TaskCard = ({ title, description, completed, priority, dueDate }) => {
  const prettyDate = formatDate(dueDate);
  return (
    <div className="bg-black m-3 p-3 rounded-2xl border-4 border-border  h-[20vh] w-[100vh]">
      <h1>{title}</h1>
      <p>{description}</p>
      <section>{completed}</section>
      <div>{priority}</div>
      <div>{prettyDate}</div>
    </div>
  );
};

export default TaskCard;
