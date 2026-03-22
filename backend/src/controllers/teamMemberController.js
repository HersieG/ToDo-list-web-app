import express from "express";
import { prisma } from "../config/db.js";

export const getTeamMembers = async (req, res) => {
  try {
    const userId = req.user.id;
    
  } catch (error) {
    console.error("Error fetching teams:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching team members" });
  }
};
