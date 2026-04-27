import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
