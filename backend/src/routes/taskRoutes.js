import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasksController.js";

const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all routes in this router

router.get("/", getTasks);
router.get("/:id", getTask);

router.post("/createTask", createTask);

router.put("/updateTask/:id", updateTask);

router.delete("/deleteTask/:id", deleteTask);
export default router;
