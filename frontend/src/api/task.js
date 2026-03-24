import { request } from "./index";

export const getTasks = async () => {
  const response = await request("/task");
  return response.data;
};
