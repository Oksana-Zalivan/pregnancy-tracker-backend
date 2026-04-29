import Diary from '../models/diary.js';

export const getDiaries = async (req, res, next) => {
  try {
    const diaries = await Diary.find({ userId: req.user._id }).sort({
      date: -1,
    });

    res.status(200).json({
      message: 'Записи щоденника отримано',
      data: diaries,
    });
  } catch (error) {
    next(error);
  }
};

export const createDiary = async (req, res, next) => {
  try {
    const { title, description, date, emotions } = req.body;

    const diary = await Diary.create({
      title,
      description,
      date,
      emotions,
      userId: req.user._id,
    });

    res.status(201).json({
      message: 'Запис щоденника створено',
      data: diary,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDiaryController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const diary = await Diary.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true },
    );

    if (!diary) {
      return res.status(404).json({
        message: 'Запис щоденника не знайдено',
      });
    }

    res.status(200).json({
      message: 'Запис щоденника оновлено',
      data: diary,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDiaryController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const diary = await Diary.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!diary) {
      return res.status(404).json({
        message: 'Запис щоденника не знайдено',
      });
    }

    res.status(200).json({
      message: 'Запис щоденника видалено',
      data: diary,
    });
  } catch (error) {
    next(error);
  }
};
