import express from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middlewares/authenticate.js";
import { getDiaries, createDiary } from "../controllers/diaryController.js";
import { createDiarySchema } from "../validation/diary.js";

const router = express.Router();

router.get("/", authenticate, getDiaries);
router.post("/", authenticate, celebrate(createDiarySchema), createDiary);

export default router;