import Diary from "../models/Diary.js";

export const getDiaries = async (req, res) => {
  try {
    const diaries = await Diary.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(diaries);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const createDiary = async (req, res) => {
  try {
    const { title, description, date, emotions } = req.body;

    const diary = await Diary.create({
      title,
      description,
      date,
      emotions,
      userId: req.user._id,
    });

    res.status(201).json(diary);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};