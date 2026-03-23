import express from "express";
import { prisma } from "../config/db.js";

export const updateTeamMemberRole = async (req, res) => {
  try {
    const userId = req.user.id;
    const teamId = req.params.teamId;
    const teamMemberId = req.params.memberId;

    const { teamMemberRole } = req.body;

    const isUserAllowed = await prisma.teamMember.findFirst({
      where: {
        userId: userId,
        teamId: teamId,
        role: { in: ["ADMIN", "OWNER"] },
      },
    });

    if (!isUserAllowed) {
      return res.status(404).json({
        error: "You do not have permission to update team member role.",
      });
    }
    if (!teamMemberRole || !teamMemberRole.trim()) {
      return res
        .status(404)
        .json({ error: "Please enter a role for the team member" });
    }

    const allowedUpdates = ["ADMIN", "MEMBER"];

    if (!allowedUpdates.includes(teamMemberRole)) {
      return res
        .status(404)
        .json({ error: "Please update team member role to ADMIN or MEMBER" });
    }
    console.log(teamMemberId);
    const updatedTeamMemberRole = await prisma.teamMember.update({
      where: {
        id: teamMemberId,
      },
      data: {
        role: teamMemberRole,
      },
    });

    return res
      .status(201)
      .json({ status: "Success", data: updatedTeamMemberRole });
  } catch (error) {
    if (error === "P2025") {
      res.status(404).json({ error: "Could not update team member role." });
    }
    console.log("There was en error updating team member role.", error);
    return res.status(404).json({ error: "Error updating team member role." });
  }
};

export const removeTeamMember = async (req, res) => {
  try {
    const userId = req.user.id;
    const teamId = req.params.teamId;
    const teamMemberId = req.params.memberId;

    const isUserAllowed = await prisma.teamMember.findFirst({
      where: {
        userId: userId,
        teamId: teamId,
        role: { in: ["ADMIN", "OWNER"] },
      },
    });

    if (!isUserAllowed) {
      return res.status(404).json({
        error: "You do not have permission to remove team member.",
      });
    }

    await prisma.teamMember.delete({
      where: {
        id: teamMemberId,
      },
    });

    return res.status(201).json({ status: "Success" });
  } catch (error) {
    if (error === "P2025") {
      res.status(404).json({ error: "Could not remove team member." });
    }
    console.log("There was en error removing team member.", error);
    return res.status(404).json({ error: "Error removing team member." });
  }
}

export const leaveTeam = async (req, res) => {
  try {
    const userId = req.user.id;
    const teamId = req.params.teamId;

    await prisma.teamMember.delete({
      where: {
        userId_teamId: {
          userId: userId,
          teamId: teamId,
        },
      },
    });

    return res.status(201).json({ status: "Success" });
  } catch (error) {
    if (error === "P2025") {
      res.status(404).json({ error: "Could not leave team." });
    }
    console.log("There was en error leaving team.", error);
    return res.status(404).json({ error: "Error leaving team." });
  }
}