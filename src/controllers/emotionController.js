import { Emotion } from '../models/emotion.js';

export const getEmotions = async (req, res, next) => {
  try {
    const emotions = await Emotion.find().lean();

    res.status(200).json({
      message: 'Емоції успішно отримані',
      data: emotions,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmotion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const emotion = await Emotion.findOne({ id }).lean();

    if (!emotion) {
      return res.status(404).json({
        message: 'Емоцію не знайдено',
      });
    }

    res.status(200).json({
      message: 'Емоцію отримано',
      data: emotion,
    });
  } catch (error) {
    next(error);
  }
};
