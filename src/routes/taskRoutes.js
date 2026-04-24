import express from "express";
import celebrate from celebrate;

import { taskValidationSchema } from "../validation/tasksValidation";

const tasksRouter = express.Router();

tasksRouter.post('/api/tasks', celebrate(taskValidationSchema), )

tasksRouter.get('api/tasks', celebrate(taskValidationSchema), );

export default tasksRouter;
