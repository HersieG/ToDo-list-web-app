import { useState, useEffect } from "react";
import { getTeams, getTeamMembers } from "../api/teams.js";

// useGetTeams.js
export const useGetTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useGetTeams.js
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const teams = await getTeams();
        setTeams(teams);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);
  return { teams, loading, error };
};
