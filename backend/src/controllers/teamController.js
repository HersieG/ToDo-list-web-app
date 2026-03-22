import express from "express";
import { prisma } from "../config/db.js";

export const getTeams = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Fetching teams for user ID:", userId);
    const teams = await prisma.team.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
    });

    if (teams.length === 0) {
      return res.status(404).json({ error: "No teams found for this user" });
    }

    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "An error occurred while fetching teams" });
  }
};

export const getTeam = async (req, res) => {
  try {
    const userId = req.user.id;
    const teamId = req.params.id;
    console.log(`Fetching team with ID: ${teamId} for user ID: ${userId}`);

    const team = await prisma.team.findFirst({
      where: {
        id: teamId,
        members: {
          some: {
            userId: userId,
          },
        },
      },
    });

    if (!team) {
      return res.status(404).json({ error: "Team not found or access denied" });
    }

    res.status(200).json(team);
  } catch (error) {
    console.error("Error fetching team:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the team" });
  }
};

export const getTeamMembers = async (req, res) => {
  try {
    const userId = req.user.id;
    const teamId = req.params.id;
    console.log(teamId);
    const teamMembers = await prisma.team.findFirst({
      where: {
        id: teamId,
        members: {
          some: {
            userId: userId,
          },
        },
      },
      select: {
        name: true,
        members: {
          select: {
            role: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!teamMembers) {
      return res.status(404).json({ error: "Team not found or access denied" });
    }

    res.status(200).json({ status: "Success", data: teamMembers });
  } catch (error) {
    console.error("Error fetching team members:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the team members" });
  }
};

export const createTeam = async (req, res) => {
  const userId = req.user.id;
  const { name, description } = req.body;
  const data = {};
  if (!name) {
    return res
      .status(404)
      .json({ error: "Please enter a name for your team." });
  }
  if (description) {
    data.description = description;
  }
  data.name = name;

  const createdTeam = await prisma.team.create({
    data: {
      ...data,
      createdBy: userId,
      members: {
        create: {
          userId: userId,
          role: "OWNER",
        },
      },
    },
  });

  return res.status(201).json({ status: "success", data: createdTeam });
};

export const updateTeam = async (req, res) => {
  try {
    const userId = req.user.id;
    const teamId = req.params.id;
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(401).json({ error: "Please type in a name." });
    }
    var data = { name, description };

    console.log(data);
    const updatedTeam = await prisma.team.update({
      where: {
        id: teamId,
        members: {
          some: {
            userId: userId,
          },
        },
      },
      data: data,
    });

    return res.status(200).json({ status: "success", data: updatedTeam });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ status: "error", error: "Team not found" });
    }
    console.error("Error updating team:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the team" });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const userId = req.user.id;
    const teamId = req.params.id;

    const deletedTeam = await prisma.team.delete({
      where: {
        id: teamId,
        members: {
          some: {
            userId: userId,
          },
        },
      },
    });

    return res.status(200).json({ status: "success", data: deletedTeam });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ status: "error", error: "Team not found" });
    }
    console.error("Error updating team:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the team" });
  }
};

export const invite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { teamId, recipientId } = req.params;

    // check to see if the user is apart of the team first or if they are an admin/owner of the team if they are in it
    const member = await prisma.teamMember.findFirst({
      where: {
        userId: userId,
        teamId: teamId,
        role: { in: ["ADMIN", "OWNER"] },
      },
    });

    if (!member) {
      return res
        .status(404)
        .json({ error: "You do not have permission to invite users." });
    }

    // now invite after validation
    const invitedUser = await prisma.invitation.create({
      data: {
        userId: recipientId,
        teamId: teamId,
        createdById: userId,
      },
    });

    return res.status(404).json({ status: "Success", data: invitedUser });
  } catch (error) {
    console.error("Error inviting user to team:", error);
    res
      .status(500)
      .json({ error: "An error occurred while inviting user to the team" });
  }
};
