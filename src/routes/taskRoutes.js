import express from "express";
import { authenticate } from "../middlewares/authenticate.js"; 
import { updateTaskStatus } from "../controllers/taskController.js";

const router = express.Router();

router.patch("/:taskId/status", authenticate, updateTaskStatus);

export default router;