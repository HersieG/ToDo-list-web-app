import { useState, useEffect } from "react";
import { getTeams, getTeamMembers } from "../api/teams.js";

// useGetTeams.js
export const useGetTeams = () => {
  const [teams, setTeams] = useState([]);
  const [teamMembers, setTeamMembers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useGetTeams.js
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const teams = await getTeams();
        setTeams(teams);
        setLoading(false); // ← unblock the UI as soon as teams are ready

        // Members trickle in individually as each resolves
        await Promise.all(
          teams.map(async (t) => {
            const members = await getTeamMembers(t.id);
            setTeamMembers((prev) => ({ ...prev, [t.id]: members }));
          }),
        );
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { teams, teamMembers, loading, error };
};
