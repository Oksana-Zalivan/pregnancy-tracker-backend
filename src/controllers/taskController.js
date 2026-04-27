import { Task } from "../models/task.js";

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { isDone } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user._id },
      { isDone },
      { returnDocument: "after" }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};