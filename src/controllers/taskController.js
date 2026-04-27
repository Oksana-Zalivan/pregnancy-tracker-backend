import { Task } from "../models/task.js";

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    
    res.status(200).json({
      message: "Завдання отримано",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user._id,
    });
    
    res.status(201).json({
      message: "Завдання створено",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};
