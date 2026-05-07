import {
  getBabyByWeekNumber,
  getMomBodyByWeekNumber,
} from '../services/weekService.js';

const validateWeekNumber = (weekNumber) => {
  return Number.isInteger(weekNumber) && weekNumber >= 1 && weekNumber <= 40;
};

const normalizeCurrentWeekResponse = ({
  weekNumber,
  daysUntilBirth,
  baby,
}) => ({
  weekNumber,
  daysUntilBirth,
  baby: {
    analogy: baby.analogy,
    size: baby.babySize,
    weight: baby.babyWeight,
    image: baby.image,
    activity: baby.babyActivity,
    development: baby.babyDevelopment,
  },
  momTip: baby.momDailyTips?.[0] ?? null,
});

export const getBabyByWeek = async (req, res, next) => {
  try {
    const weekNumber = Number(req.params.weekNumber);

    if (!validateWeekNumber(weekNumber)) {
      return res.status(400).json({
        message: 'Номер тижня має бути цілим числом від 1 до 40',
      });
    }

    const week = await getBabyByWeekNumber(weekNumber);

    if (!week) {
      return res.status(404).json({
        message: `Дані дитини за тиждень ${weekNumber} не знайдено`,
      });
    }

    return res.status(200).json({
      message: 'Дані про розвиток дитини отримано',
      data: week,
    });
  } catch (error) {
    next(error);
  }
};

export const getMomBodyByWeek = async (req, res, next) => {
  try {
    const weekNumber = Number(req.params.weekNumber);

    if (!validateWeekNumber(weekNumber)) {
      return res.status(400).json({
        message: 'Номер тижня має бути цілим числом від 1 до 40',
      });
    }

    const week = await getMomBodyByWeekNumber(weekNumber);

    if (!week) {
      return res.status(404).json({
        message: `Дані мами за тиждень ${weekNumber} не знайдено`,
      });
    }

    return res.status(200).json({
      message: 'Дані про стан мами отримано',
      data: week,
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicCurrentWeek = async (req, res, next) => {
  try {
    const weekNumber = 1;

    const baby = await getBabyByWeekNumber(weekNumber);

    if (!baby) {
      return res.status(404).json({
        message: 'Дані початкового тижня не знайдено',
      });
    }

    const daysUntilBirth = 40 * 7;

    return res.status(200).json({
      message: 'Публічні дані поточного тижня отримано',
      data: normalizeCurrentWeekResponse({
        weekNumber,
        daysUntilBirth,
        baby,
      }),
    });
  } catch (error) {
    next(error);
  }
};

export const getPrivateCurrentWeek = async (req, res, next) => {
  try {
    const user = req.user;

    const today = new Date();

    let daysUntilBirth = 280;
    let passedDays = 0;

    if (user.dueDate) {
      const dueDate = new Date(user.dueDate);

      daysUntilBirth = Math.ceil(
        (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );

      passedDays = 280 - daysUntilBirth;
    }

    let weekNumber = Math.floor(passedDays / 7) + 1;

    if (weekNumber < 1) weekNumber = 1;
    if (weekNumber > 40) weekNumber = 40;
    if (daysUntilBirth < 0) daysUntilBirth = 0;

    const baby = await getBabyByWeekNumber(weekNumber);

    if (!baby) {
      return res.status(404).json({
        message: `Дані для ${weekNumber} тижня не знайдено`,
      });
    }

    return res.status(200).json({
      message: 'Приватні дані поточного тижня отримано',
      data: normalizeCurrentWeekResponse({
        weekNumber,
        daysUntilBirth,
        baby,
      }),
    });
  } catch (error) {
    next(error);
  }
};
