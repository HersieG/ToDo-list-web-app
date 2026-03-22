import express from "express";
import { prisma } from "../config/db.js";

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user is set by auth middleware

    console.log(userId);
    const tasks = await prisma.task.findMany({
      where: { userId: userId },
    });
    return res.status(200).json({ status: "success", data: tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, priority, dueDate } = req.body;

    if (!title || !description || !priority || !dueDate) {
      return res
        .status(400)
        .json({ status: "error", error: "Missing required fields" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        dueDate: new Date(dueDate),
        userId,
      },
    });

    return res.status(201).json({ status: "success", data: task });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
};


