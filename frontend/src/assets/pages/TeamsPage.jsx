import React from "react";
import { MdOutlineGroups2 } from "react-icons/md";
import NavbarSidebar from "../../components/NavbarSidebar";
import Footer from "../../components/Footer";
import { useGetTeams } from "../../hooks/useGetTeams";
import TeamCard from "../../components/TeamCard";
import { useGetUser } from "../../hooks/useGetUser";
const TeamsPage = () => {
  const {
    loading: teamLoading,
    error: teamError,
    teams,
    teamMembers,
  } = useGetTeams();
  const { user, loading, error } = useGetUser();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  
  return (
    <NavbarSidebar>
      <div className="flex flex-col h-screen">
        <div className="flex justify-center mt-8 font-medium text-2xl md:text-3xl lg:text-4xl mb-8">
          <h1>Here are your teams!</h1>
        </div>
        <div className="flex-1 bg-black w-full">
          {/* {console.log(teamMembers)} */}
          {teams.map((t) => (
            <TeamCard
              key={t.id}
              name={t.name}
              description={t.description}
              members={teamMembers[t.id] ?? []}
            />
          ))}
        </div>
        <Footer />
      </div>
    </NavbarSidebar>
  );
};

export default TeamsPage;
