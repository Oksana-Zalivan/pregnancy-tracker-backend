import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import tasksRouter from "./routes/tasks.js";
import diariesRouter from "./routes/diaries.js";
import weeksRouter from "./routes/weeks.js";

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({
      message: "Backend is running",
    });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/tasks", tasksRouter);
  app.use("/api/diaries", diariesRouter);
  app.use("/api/weeks", weeksRouter);

  return app;
};
