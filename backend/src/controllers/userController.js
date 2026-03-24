import express from "express";
import { prisma } from "../config/db.js";

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    console.log("Error with getting user info", error);
    return res.status(404).json({ error: "Error fetching user info" });
  }
};
