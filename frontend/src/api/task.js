import { request } from "./index";

export const getTasks = async () => {
  const response = await request("/task");
  return response.data;
};

export const getTeamTasks = async (id) => {
  console.log(id);
  const response = await request(`/task/team/${id}`);
  console.log(response);
  return response.data;
};

export const taskCompleted = async (id, completed) => {
  const response = await request(`/task/${id}/completed`, {
    method: "PATCH",
    body: JSON.stringify({ completed }),
  });
  return response.data;
};

export const createTask = async ({ title, description, dueDate, priority }) => {
  const response = await request("/task/createTask", {
    method: "POST",
    body: JSON.stringify({ title, description, dueDate, priority }),
  });
  return response;
};
