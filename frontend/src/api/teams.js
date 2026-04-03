import { request } from "./index";

export const getTeams = async () => {
  const response = await request("/team");
  console.log(response);
  return response;
};

export const getTeamMembers = async (id) => {
  const response = await request(`/team/${id}/members`);
  console.log("members: ", response);
  return response.data.members;
};

export const getTeam = async (id) => {
  const response = await request(`/team/${id}`);

  return response;
};
