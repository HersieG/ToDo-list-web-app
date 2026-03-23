import express from "express";
import { prisma } from "../config/db.js";

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ data: user });
  } catch {
    console.log("Error with getting user info", error);
    return res.status(404).json({ error: "Error fetching user info" });
  }
};
