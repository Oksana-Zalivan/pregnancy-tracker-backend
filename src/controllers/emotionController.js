import {
  getAllEmotions,
  getEmotionById,
} from '../models/emotion.js';


export const getEmotions = async (req, res, next) => {
  try {
    const emotions = await getAllEmotions();

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

    const emotion = await getEmotionById(id);

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