import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getInvites,respondToInvitation } from "../controllers/invitationController.js";
const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all routes in this router

router.get("/pending", getInvites);

router.patch("/:id", respondToInvitation)

export default router;
