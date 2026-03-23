import express from "express";
import { prisma } from "../config/db.js";

export const getInvites = async (req, res) => {
  try {
    const userId = req.user.id;

    const invites = await prisma.invitation.findMany({
      where: {
        userId: userId,
        status: "PENDING",
      },
    });

    if (invites.length === 0) {
      return res.status(404).json({ error: "No invites found" });
    }

    return res.status(200).json({ status: "Success", data: invites });
  } catch (error) {
    console.error("Error fetching invitations:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching invitations" });
  }
};

export const respondToInvitation = async (req, res) => {
  try {
    const userId = req.user.id;
    const invitationId = req.params.id;

    const { status } = req.body;

    if (!status || !status.trim()) {
      return res.status(404).json({ error: "Please accept or decline." });
    }

    if (!["ACCEPTED", "DECLINED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const invitation = await prisma.invitation.findFirst({
      where: {
        id: invitationId,
      },
      include: {
        team: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!invitation || invitation.userId !== userId) {
      return res
        .status(404)
        .json({ error: "Invitation not found or you do not permission" });
    }

    if (invitation.status !== "PENDING") {
      return res.status(400).json({
        error: "Invitation has already been responded to",
      });
    }

    const responseToInvite = await prisma.invitation.update({
      where: { id: invitationId },
      data: {
        status: status,
      },
    });

    if (status == "ACCEPTED") {
      const addedTeamMember = await prisma.teamMember.create({
        data: {
          userId: responseToInvite.userId,
          teamId: responseToInvite.teamId,
          role: "MEMBER",
        },
      });
    }
    return res.status(201).json({ status: "Success", data: responseToInvite });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ status: "error", error: "Invite not found" });
    }
    console.error("Error fetching invitations:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating invitation" });
  }
};
