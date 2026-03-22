import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getInvites } from "../controllers/invitationController.js";
const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all routes in this router

router.get("/", getInvites);

export default router;
