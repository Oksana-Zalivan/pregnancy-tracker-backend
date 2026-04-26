import express from "express";
import { updateTaskStatus } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Tasks endpoint works" });
});

router.patch("/:taskId/status", updateTaskStatus);

export default router;
