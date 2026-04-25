import express from "express";
import celebrate from celebrate;
import authenticate from "../middlewares/authenticate.js"

import { taskValidationSchema } from "../validation/tasksValidation";

import { createTask } from "../controllers/taskController";
import { getAllTasks } from "../controllers/taskController";

const tasksRouter = express.Router();

tasksRouter.post('/api/tasks', authenticate, celebrate(createTaskValidationSchema), createTask)

tasksRouter.get('api/tasks', authenticate, getAllTasks);

export default tasksRouter;
