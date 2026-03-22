import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getTasks, createTask } from "../controllers/tasksController.js";

const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all routes in this router

router.get("/", getTasks);

router.post("/createTask", createTask);


export default router;
