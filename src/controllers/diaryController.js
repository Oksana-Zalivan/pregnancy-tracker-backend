import createError from "http-errors";
import { updateDiary, deleteDiary } from "../services/diaryService.js";

export const updateDiaryEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const diary = await updateDiary(id, userId, req.body);
    if (!diary) return next(createError(404, "Diary entry not found"));

    res.status(200).json(diary);
  } catch (error) {
    next(error);
  }
};

export const deleteDiaryEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const diary = await deleteDiary(id, userId);
    if (!diary) return next(createError(404, "Diary entry not found"));

    res.status(200).json(diary);
  } catch (error) {
    next(error);
  }
};