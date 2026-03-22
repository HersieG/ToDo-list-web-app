import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getTeams,
  getTeam,
  getTeamMembers,
  createTeam,
  updateTeam,
  deleteTeam,
  invite,
} from "../controllers/teamController.js";
const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all routes in this router

router.get("/", getTeams);
router.get("/:id", getTeam);

router.get("/:id/members", getTeamMembers);
router.post("/createTeam", createTeam);

router.put("/updateTeam/:id", updateTeam);

router.post("/:teamId/invite/:recipientId", invite);

router.delete("/deleteTeam/:id", deleteTeam);

export default router;
