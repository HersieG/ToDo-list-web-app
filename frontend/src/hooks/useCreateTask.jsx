import { useState } from "react";
import { createTask } from "../api/task";

export const useCreateTask = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async ({ title, description, dueDate, priority }) => {
    setLoading(true);
    try {
      const createdTask = await createTask({
        title,
        description,
        dueDate,
        priority,
      });
      setTask(createdTask);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { task, loading, error, create };
};
