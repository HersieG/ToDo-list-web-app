import express from "express";
import { prisma } from "../config/db.js";

export const getInvites = async (req, res) => {
  try {
    const userId = req.user.id;

    const invites = await prisma.invitation.findMany({
      where: {
        userId: userId,
      },
    });

    if (!invites) {
      return res.status(404).json({ error: "No invites found" });
    }

    return res.status(200).json({ status: "Success", data: invites });
  } catch {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "An error occurred while fetching teams" });
  }
};
