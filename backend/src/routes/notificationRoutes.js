import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../controllers/notificationController.js";
const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all routes in this router

router.get("/", getNotifications);

router.patch("/:id/read", markAsRead);

router.patch("/readAll", markAllAsRead);
export default router;
