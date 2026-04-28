import express from "express";
import { getDiaries, createDiary } from "../controllers/diaryController.js";

const router = express.Router();

router.get("/", getDiaries);
router.post("/", createDiary);

export default router;