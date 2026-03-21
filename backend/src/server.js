import express from "express";
import { config } from "dotenv";
// routes
import taskRoutes from "./routes/taskRoutes.js";

config();

const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);

const PORT = 5001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// AUTH
// USERS
// TASKS
// LIST
