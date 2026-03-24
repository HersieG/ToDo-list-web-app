import React from "react";
import { useState } from "react";
import { useGetUser } from "../../hooks/useGetUser";
import { useGetTasks } from "../../hooks/useGetTasks";
import TaskCard from "../../components/TaskCard";
import NavbarSidebar from "../../components/NavbarSidebar";
const Dashboard = () => {
  const {
    user,
    loading: userLoading,
    error: userError,
    fetchUser,
  } = useGetUser();
  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    fetchTasks,
  } = useGetTasks();
  return (
    <NavbarSidebar>
      <div className="overflow-visible">
        {userLoading ? (
          "loading data..."
        ) : (
          <div className="flex justify-center place-items-center p-1 h-30 ">
            <h1 className="text-4xl">Welcome {user?.name}</h1>
          </div>
        )}
        <div className="flex flex-col place-items-center justify-center">
          {tasks.length !== 0 ? (
            <div>
              {" "}
              {tasks.map((t) => (
                <div key={t.id}>
                  <TaskCard
                    title={t.title}
                    description={t.description}
                    completed={t.completed}
                    priority={t.priority}
                    dueDate={t.dueDate}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>no tasks</div>
          )}
        </div>
      </div>
    </NavbarSidebar>
  );
};

export default Dashboard;
