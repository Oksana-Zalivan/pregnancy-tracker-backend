import express from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middlewares/authenticate.js";
import { createTaskValidationSchema } from "../validation/auth.js";

import {
  createTask,
  getAllTasks,
  updateTaskStatus,
} from "../controllers/taskController.js";

const tasksRouter = express.Router();

tasksRouter.post(
  "/",
  authenticate,
  celebrate(createTaskValidationSchema),
  createTask
);

tasksRouter.get("/", authenticate, getAllTasks);

tasksRouter.patch(
  "/:taskId/status",
  authenticate,
  updateTaskStatus
);

export default tasksRouter;