import express from "express";
import "dotenv/config";
import { connectDB, disconnectDB } from "./config/db.js";
// routes
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const PORT = 5001;

app.listen(PORT, () => {
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
