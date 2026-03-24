import { useState, useEffect } from "react";
import { getTasks } from "../api/task.js";

export const useGetTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setError(null);
    try {
      const tasks = await getTasks();
      setTasks(tasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, fetchTasks };
};
