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

export const updateDiary = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedDiary = await Diary.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true },
    );

    if (!updatedDiary) {
      return res.status(404).json({ message: 'Запис не знайдено' });
    }

    res.json({
      message: 'Запис оновлено',
      data: updatedDiary,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteDiary = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDiary = await Diary.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!deletedDiary) {
      return res.status(404).json({ message: 'Запис не знайдено' });
    }

    res.json({
      message: 'Запис видалено',
      data: deletedDiary,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};