import express from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middlewares/authenticate.js"
import { createTaskValidationSchema } from "../validation/task.js";
import { createTask, getAllTasks } from "../controllers/taskController.js";

const tasksRouter = express.Router();

tasksRouter.post(
  '/',
  authenticate,
  celebrate(createTaskValidationSchema), 
  createTask
);

tasksRouter.get('/', authenticate, getAllTasks);

export default tasksRouter;

