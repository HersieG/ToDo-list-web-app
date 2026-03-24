import { request } from "./index";

export const getUser = async () => {
  const response = await request("/user");
  return response.data;
};
