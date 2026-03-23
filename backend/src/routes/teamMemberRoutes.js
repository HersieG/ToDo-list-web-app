import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  updateTeamMemberRole,
  removeTeamMember,
  leaveTeam,
} from "../controllers/teamMemberController.js";
const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all routes in this router

router.patch("/:teamId/members/:memberId", updateTeamMemberRole);

router.delete("/:teamId/members/:memberId", removeTeamMember);

router.delete("/:teamId/leave", leaveTeam);
export default router;
