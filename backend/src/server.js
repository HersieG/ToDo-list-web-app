import express from "express";
import "dotenv/config";
import { connectDB, disconnectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

// routes
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import invitationRoutes from "./routes/invitationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import teamMemberRoutes from "./routes/teamMemberRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";


connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/teamMember", teamMemberRoutes);
app.use("/api/invite", invitationRoutes);
app.use("/api/notification", notificationRoutes);
const PORT = 5001;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err.message);
  await disconnectDB();
  process.exit(1);
});

process.on("SIGTERM", (err) => {
  console.error("SIGTERM received:", err ? err.message : "No error message");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
