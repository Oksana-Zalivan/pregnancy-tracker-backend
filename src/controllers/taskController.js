import { Task } from "../models/Task";
import createHttpError from "http-errors";

export const getAllTasks = async (req, res) => {
  const tasksQuery = await Task.find({ userId: req.user._id });
  res.status(200).json({
    message: "Завдання отримано",
    data: tasksQuery,
  });
};

export const createTask = (req, res) => {
  const task = await Task.create({
    ...req.body,
    userId: req.user._id,
  });
  
  res.status(201).json({
    message: "Завдання створено",
    data: task,
  });
};