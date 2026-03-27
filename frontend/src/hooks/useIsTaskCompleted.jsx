import { useState } from "react";
import { taskCompleted } from "../api/task";

export const useIsTaskCompleted = () => {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateTaskCompleted = async (id, completed) => {
    setLoading(true);
    setError(null);
    try {
      await taskCompleted(id, completed);
      setCompleted(completed);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { completed, loading, error, updateTaskCompleted };
};
