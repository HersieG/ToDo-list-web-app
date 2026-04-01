import React from "react";
import { useGetUser } from "../../hooks/useGetUser";
import { useGetTasks } from "../../hooks/useGetTasks";
import TaskCard from "../../components/TaskCard";
import NavbarSidebar from "../../components/NavbarSidebar";
import Footer from "../../components/Footer";
import { useState } from "react";
import Modal from "../../components/Modal";
import CreateTask from "../../components/CreateTask";

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

const Dashboard = () => {
  const { user, loading: userLoading } = useGetUser();
  const { tasks, setTasks, loading: tasksLoading } = useGetTasks();
  const [isOpen, setIsOpen] = useState(false);

  const doneTasks = tasks.filter((t) => t.completed);
  const notDoneTasks = tasks.filter((t) => !t.completed);

  const handleTaskChange = (id, next) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: next } : t)),
    );
  };

  return (
    <NavbarSidebar>
      <div className="flex flex-col min-h-screen w-full">
        {/* welcome header */}
        <div className="flex justify-center items-center py-8 px-4">
          <div className="flex-1">{""}</div>
          {userLoading ? (
            <div className="flex-1 h-10 w-48 bg-base-300 animate-pulse rounded-lg" />
          ) : (
            <h1 className="flex-1 text-3xl md:text-4xl font-bold text-center">
              Welcome, {user?.name}
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
              <CreateTask />
            </Modal>
          </div>
        </div>

        {/* two column layout */}
        <div className="flex-1 w-full px-6 pb-8 flex flex-col md:flex-row gap-6 items-start">
          {tasksLoading ? (
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

export default Dashboard;
