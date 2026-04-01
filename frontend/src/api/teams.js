import { request } from "./index";

export const getTeams = async () => {
  const response = await request("/team");
  console.log(response);
  return response;
};

export const getTeamMembers = async (id) => {
  const response = await request(`/team/${id}/members`);
  console.log("members: ", response.data.members);
  return response.data.members;
};
