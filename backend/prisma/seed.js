import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

const creatorId = process.env.TESTING_ID;

const tasks = [
  {
    title: "Set up project repository",
    description: "Initialize Git repo and configure CI/CD pipeline",
    completed: true,
    priority: "HIGH",
    dueDate: new Date("2025-03-01"),
  },
  {
    title: "Design database schema",
    description: "Plan and finalize the Prisma schema for the application",
    completed: true,
    priority: "HIGH",
    dueDate: new Date("2025-03-05"),
  },
  {
    title: "Implement user authentication",
    description: "JWT-based login and registration with bcrypt hashing",
    completed: true,
    priority: "HIGH",
    dueDate: new Date("2025-03-10"),
  },
  {
    title: "Build task CRUD endpoints",
    description: "Create, read, update, delete routes for tasks",
    completed: false,
    priority: "HIGH",
    dueDate: new Date("2025-03-20"),
  },
  {
    title: "Write API documentation",
    description: "Document all endpoints using Swagger or Postman",
    completed: false,
    priority: "MEDIUM",
    dueDate: new Date("2025-03-25"),
  },
  {
    title: "Add input validation middleware",
    description: "Validate request bodies using Zod",
    completed: false,
    priority: "MEDIUM",
    dueDate: new Date("2025-03-22"),
  },
  {
    title: "Set up error handling",
    description: "Global error handler for consistent API error responses",
    completed: false,
    priority: "MEDIUM",
    dueDate: new Date("2025-03-18"),
  },
  {
    title: "Implement task filtering",
    description: "Filter tasks by priority, completion status, and due date",
    completed: false,
    priority: "MEDIUM",
    dueDate: new Date("2025-03-28"),
  },
  {
    title: "Add pagination to task list",
    description: "Limit and offset support for the tasks endpoint",
    completed: false,
    priority: "LOW",
    dueDate: new Date("2025-04-01"),
  },
  {
    title: "Write unit tests",
    description: "Cover all service layer functions with Jest tests",
    completed: false,
    priority: "HIGH",
    dueDate: new Date("2025-04-05"),
  },
  {
    title: "Configure CORS",
    description: "Allow requests from the frontend origin only",
    completed: true,
    priority: "LOW",
    dueDate: new Date("2025-03-08"),
  },
  {
    title: "Set up rate limiting",
    description: "Prevent abuse by limiting requests per IP",
    completed: false,
    priority: "MEDIUM",
    dueDate: new Date("2025-04-10"),
  },
  {
    title: "Deploy backend to Railway",
    description: "Push production build and configure environment variables",
    completed: false,
    priority: "HIGH",
    dueDate: new Date("2025-04-15"),
  },
  {
    title: "Connect frontend to backend",
    description: "Replace mock data with real API calls in React",
    completed: false,
    priority: "HIGH",
    dueDate: new Date("2025-04-12"),
  },
  {
    title: "Add due date reminders",
    description: "Send email notification when a task is due tomorrow",
    completed: false,
    priority: "LOW",
    dueDate: new Date("2025-04-20"),
  },
  {
    title: "Implement task sorting",
    description: "Sort tasks by due date, priority, or creation date",
    completed: false,
    priority: "MEDIUM",
    dueDate: new Date("2025-04-03"),
  },
  {
    title: "Add dark mode to frontend",
    description: "Toggle between light and dark themes",
    completed: false,
    priority: "LOW",
    dueDate: new Date("2025-04-25"),
  },
  {
    title: "Optimize database queries",
    description: "Add indexes and review slow queries in Prisma",
    completed: false,
    priority: "MEDIUM",
    dueDate: new Date("2025-04-18"),
  },
  {
    title: "Code review and refactor",
    description: "Clean up code, remove duplication, improve readability",
    completed: false,
    priority: "LOW",
    dueDate: new Date("2025-04-28"),
  },
  {
    title: "Final QA and launch",
    description: "End-to-end testing, fix bugs, and go live",
    completed: false,
    priority: "HIGH",
    dueDate: new Date("2025-05-01"),
  },
];

const main = async () => {
  console.log("Seeding tasks...");
  for (const task of tasks) {
    await prisma.task.create({
      data: {
        ...task,
        userId: creatorId,
      },
    });
    console.log(`Created task: ${task.title}`);
  }
  console.log("Seeding completed.");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
