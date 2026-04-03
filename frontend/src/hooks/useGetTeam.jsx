import { useState, useEffect } from "react";
import { getTeam } from "../api/teams";

export const useGetTeam = (id) => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      try {
        const data = await getTeam(id);

        setTeam(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return { team, loading };
};
