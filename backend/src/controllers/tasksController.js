import express from "express";
import { prisma } from "../config/db.js";

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user is set by auth middleware

    const tasks = await prisma.task.findMany({
      where: { userId: userId },
    });
    return res.status(200).json({ status: "success", data: tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
};

export const getTeamTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const teamId = req.params.id;
    console.log("this is the team id", teamId);

    const tasks = await prisma.task.findMany({
      where: {
        teamId: teamId,
        team: {
          members: {
            some: {
              userId: userId,
            },
          },
        },
      },
    });

    return res.status(200).json({ status: "success", data: tasks });
  } catch (error) {
    console.error("Error fetching team tasks:", error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
};

export const getTask = async (req, res) => {
  try {
    const userId = req.user.id;

    const taskId = req.params.id;

    const task = await prisma.task.findFirst({
      where: { userId: userId, id: taskId },
    });

    if (!task) {
      return res.status(404).json({ status: "error", error: "Task not found" });
    }
    return res.status(200).json({ status: "success", data: task });
  } catch (error) {
    console.error("Error fetching task:", error);
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

export const updateTask = async (req, res) => {
  try {
    console.log("Updating task with data:", req.body);
    const userId = req.user.id;
    const { title, description, priority, dueDate } = req.body;
    var data = { title, description, priority, dueDate: new Date(dueDate) };

    // if (title){
    //   data.title = title;
    // }
    // if (description){
    //   data.description = description;
    // }
    // if (priority){
    //   data.priority = priority;
    // }
    // if (dueDate){
    //   data.dueDate = new Date(dueDate);
    // }
    const taskId = req.params.id;
    const updatedTask = await prisma.task.update({
      where: { id: taskId, userId: userId },
      data: data,
    });

    return res.status(200).json({ status: "success", data: updatedTask });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ status: "error", error: "Task not found" });
    }
    console.error("Error updating task:", error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;

    const deletedTask = await prisma.task.delete({
      where: { id: taskId, userId: userId },
    });

    return res.status(200).json({ status: "success", data: deletedTask });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ status: "error", error: "Task not found" });
    }
    console.error("Error deleting task:", error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
};

export const completedTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    const { completed } = req.body;

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
        userId: userId,
      },
      data: {
        completed: completed,
      },
    });

    return res.status(201).json({ status: "Success", data: updateTask });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ status: "error", error: "Task not found" });
    }
    console.error("Error deleting task:", error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
};
