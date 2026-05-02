import express from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middlewares/authenticate.js";
import { createTaskValidationSchema, updateTaskStatusValidationSchema, } from "../validation/task.js";

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
  celebrate(updateTaskStatusValidationSchema),
  updateTaskStatus
);

export default tasksRouter;