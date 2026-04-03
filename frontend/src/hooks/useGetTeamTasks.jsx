// hooks/useGetTeamTasks.js
import { useEffect, useState } from "react";
import { getTeamTasks } from "../api/task";

export const useGetTeamTasks = (id) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const data = await getTeamTasks(id);
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchTasks();
  }, [id]);

  return { tasks, loading, setTasks, fetchTasks };
};
