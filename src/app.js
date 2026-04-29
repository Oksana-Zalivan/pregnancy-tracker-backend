import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import authRouter from './routes/authRoutes.js';
import usersRouter from './routes/userRoutes.js';
import tasksRouter from './routes/taskRoutes.js';
import diariesRouter from './routes/diaryRoutes.js';
import weekRouter from './routes/weekRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.json({
      message: 'Сервер працює',
    });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/tasks", tasksRouter); 
  app.use("/api/diaries", diariesRouter);
  app.use("/api/weeks", weekRouter);

  app.use(errors());
  app.use(errorHandler);

  return app;
};
