import { Diary } from "../models/Diary.js";

export const updateDiary = async (id, userId, data) => {
  return Diary.findOneAndUpdate(
    { _id: id, userId },
    data,
    { new: true, runValidators: true }
  );
};

export const deleteDiary = async (id, userId) => {
  return Diary.findOneAndDelete({ _id: id, userId });
};