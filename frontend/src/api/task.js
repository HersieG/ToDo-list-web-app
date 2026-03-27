import { request } from "./index";

export const getTasks = async () => {
  const response = await request("/task");
  return response.data;
};

export const taskCompleted = async (id, completed) => {
  const response = await request(`/task/${id}/completed`, {
    method: "PATCH",
    body: JSON.stringify({ completed }),
  });
  return response.data;
};
