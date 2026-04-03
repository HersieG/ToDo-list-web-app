import React from "react";
import NavbarSidebar from "../components/NavbarSidebar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useGetTeamTasks } from "../hooks/useGetTeamTasks";
import { useGetTeam } from "../hooks/useGetTeam";
import TaskCard from "../components/TaskCard";
import CreateTask from "../components/CreateTask";
import Modal from "../components/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeamPage = ({ teamName }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  const { tasks, loading, error, setTasks, fetchTasks } = useGetTeamTasks(id);
  const { team, loading: teamLoading } = useGetTeam(id);

  const doneTasks = tasks.filter((t) => t.completed);
  const notDoneTasks = tasks.filter((t) => !t.completed);

  const handleTaskChange = (id, next) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: next } : t))
    );
  };

  const TaskList = ({ items, onChange }) => (
    <div className="flex flex-col gap-3">
      {items.map((t) => (
        <TaskCard
          key={t.id}
          id={t.id}
          title={t.title}
          description={t.description}
          completed={t.completed}
          priority={t.priority}
          dueDate={t.dueDate}
          onChange={onChange}
        />
      ))}
    </div>
  );

  return (
    <NavbarSidebar>
      <div className="flex flex-col min-h-screen w-full">
        <div className="flex justify-center items-center py-8 px-4">
          <div className="flex-1 ">
            <div className="btn w-fit" onClick={() => navigate("/teams")}>
              back
            </div>
          </div>
          {teamLoading ? (
            <div className="flex-1 h-10 w-48 bg-base-300 animate-pulse rounded-lg" />
          ) : (
            <h1 className="flex-1 text-3xl md:text-4xl font-bold text-center">
              Welcome, {team.name}
            </h1>
          )}
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setIsOpen(true)}
              className="btn border hover:border-base-content"
            >
              {" "}
              + create task
            </button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <CreateTask
                onSuccess={fetchTasks}
                onClose={() => setIsOpen(false)}
              />
            </Modal>
          </div>
        </div>

        {/* two column layout */}
        <div className="flex-1 w-full px-6 pb-8 flex flex-col md:flex-row gap-6 items-start">
          {loading ? (
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
              {/* active tasks */}
              <div className="flex-1 flex flex-col gap-3 min-w-0">
                <h2 className="text-sm font-semibold text-base-content/40 uppercase tracking-widest">
                  Tasks — {notDoneTasks.length}
                </h2>
                {notDoneTasks.length > 0 ? (
                  <TaskList items={notDoneTasks} onChange={handleTaskChange} />
                ) : (
                  <div className="text-center py-10 text-base-content/30 text-sm">
                    All caught up 🎉
                  </div>
                )}
              </div>

              {/* completed tasks */}
              <div className="flex-1 flex flex-col gap-3 min-w-0">
                <h2 className="text-sm font-semibold text-base-content/40 uppercase tracking-widest">
                  Completed — {doneTasks.length}
                </h2>
                {doneTasks.length > 0 ? (
                  <TaskList items={doneTasks} onChange={handleTaskChange} />
                ) : (
                  <div className="text-center py-10 text-base-content/30 text-sm">
                    No completed tasks yet
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

export default TeamPage;
