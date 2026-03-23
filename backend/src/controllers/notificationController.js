import express from "express";
import { prisma } from "../config/db.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await prisma.notification.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });

    if (!notifications) {
      return res
        .status(404)
        .json({ status: "error", error: "No notifications found" });
    }

    return res.status(200).json({ status: "success", data: notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const notificationId = req.params.id;

    const notification = await prisma.notification.updateMany({
      where: { id: notificationId, userId: userId },
      data: { isRead: true },
    });

    if (notification.count === 0) {
      return res
        .status(404)
        .json({ status: "error", error: "Notification not found" });
    }

    return res.status(200).json({ status: "success", data: notification });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ status: "error", error: "Notification not found" });
    }
    console.error("Error marking notification as read:", error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await prisma.notification.updateMany({
      where: { userId: userId, isRead: false },
      data: { isRead: true },
    });

    return res.status(200).json({ status: "success", data: notifications });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ status: "error", error: "No unread notifications found" });
    }
    console.error("Error marking all notifications as read:", error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
};
