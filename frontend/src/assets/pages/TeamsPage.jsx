import React from "react";
import NavbarSidebar from "../../components/NavbarSidebar";
import Footer from "../../components/Footer";
import { useGetTeams } from "../../hooks/useGetTeams";
import TeamCard from "../../components/TeamCard";
import { useGetUser } from "../../hooks/useGetUser";

const TeamList = ({ items }) => (
  <div className="flex flex-col gap-3">
    {items.map((t) => (
      <TeamCard
        key={t.id}
        name={t.name}
        description={t.description}
        members={t.members}
      />
    ))}
  </div>
);

const TeamsPage = () => {
  const { loading: teamLoading, teams } = useGetTeams();
  const { user, loading: userLoading } = useGetUser();

  const myTeams = user
    ? teams.filter((t) =>
        t.members.some(
          (m) => m.user.id === user.id && ["OWNER", "ADMIN"].includes(m.role),
        ),
      )
    : [];

  const otherTeams = user
    ? teams.filter((t) =>
        t.members.some(
          (m) => m.user.id === user.id && !["OWNER", "ADMIN"].includes(m.role),
        ),
      )
    : [];

  return (
    <NavbarSidebar>
      <div className="flex flex-col min-h-screen w-full">
        {/* header */}
        <div className="flex justify-center items-center py-8 px-4">
          {userLoading ? (
            <div className="h-10 w-48 bg-base-300 animate-pulse rounded-lg" />
          ) : (
            <h1 className="text-3xl md:text-4xl font-bold">Your Teams</h1>
          )}
        </div>

        {/* two column layout */}
        <div className="flex-1 w-full px-6 pb-8 flex flex-col md:flex-row gap-6 items-start">
          {teamLoading ? (
            <div className="flex flex-col gap-3 w-full">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-28 bg-base-300 animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : (
            <>
              {/* my teams */}
              <div className="flex-1 flex flex-col gap-3 min-w-0">
                <h2 className="text-sm font-semibold text-base-content/40 uppercase tracking-widest">
                  My Teams — {myTeams.length}
                </h2>
                {myTeams.length > 0 ? (
                  <TeamList items={myTeams} />
                ) : (
                  <div className="text-center py-10 text-base-content/30 text-sm">
                    You don't own any teams yet
                  </div>
                )}
              </div>

              {/* other teams */}
              <div className="flex-1 flex flex-col gap-3 min-w-0">
                <h2 className="text-sm font-semibold text-base-content/40 uppercase tracking-widest">
                  Other Teams — {otherTeams.length}
                </h2>
                {otherTeams.length > 0 ? (
                  <TeamList items={otherTeams} />
                ) : (
                  <div className="text-center py-10 text-base-content/30 text-sm">
                    You haven't joined any other teams
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <Footer />
      </div>
    </NavbarSidebar>
  );
};

export default TeamsPage;
