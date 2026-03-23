import { request } from "./index";

export const login = async ({ email, password }) => {
  return await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};
