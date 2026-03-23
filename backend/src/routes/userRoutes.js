import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getUserInfo } from "../controllers/userController.js";
const router = express.Router();

router.use(authMiddleware);

router.get("/", getUserInfo);

export default router;
