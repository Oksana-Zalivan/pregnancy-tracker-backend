import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { updateDiaryEntry, deleteDiaryEntry } from "../controllers/diaryController.js";

const router = express.Router();

router.patch("/:id", authenticate, updateDiaryEntry);
router.delete("/:id", authenticate, deleteDiaryEntry);

export default router;