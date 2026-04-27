import { Diary } from "../models/diary.js";

export const updateDiary = async (id, userId, data) => {
  return Diary.findOneAndUpdate(
    { _id: id, userId },
    data,
    { returnDocument: "after", runValidators: true }
  );
};

export const deleteDiary = async (id, userId) => {
  return Diary.findOneAndDelete({ _id: id, userId });
}; 

