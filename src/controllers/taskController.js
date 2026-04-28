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

export const updateTaskStatus = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { isDone } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user._id },
      { isDone },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Завдання не знайдено",
      });
    }

    res.status(200).json({
      message: "Статус оновлено",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};
