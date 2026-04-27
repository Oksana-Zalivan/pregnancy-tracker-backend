import {
  getBabyByWeekNumber,
  getMomBodyByWeekNumber,
} from "../services/weekService.js";

export const getBabyByWeek = async (req, res, next) => {
  try {
    const weekNumber = Number(req.params.weekNumber);

    if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 39) {
      return res.status(400).json({
        message: "Номер тижня має бути цілим числом від 1 до 39 ",
      });
    }

    const week = await getBabyByWeekNumber(weekNumber);

    if (!week) {
      return res.status(404).json({
        message: `Дані дитини за тиждень ${weekNumber} не знайдено`,
      });
    }

    return res.status(200).json(week);
  } catch (error) {
    next(error);
  }
};

export const getMomBodyByWeek = async (req, res, next) => {
  try {
    const weekNumber = Number(req.params.weekNumber);

    if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 39) {
      return res.status(400).json({
        message: "Номер тижня має бути цілим числом від 1 до 39",
      });
    }

    const week = await getMomBodyByWeekNumber(weekNumber);
    if (!week) {
      return res.status(404).json({
        message: `Дані мами за тиждень ${weekNumber} не знайдено`,
      });
    }

    return res.status(200).json(week);
  } catch (error) {
    next(error);
  }
};
export const getPublicCurrentWeek = async (req, res, next) => {
  try {
    // Для незареєстрованого користувача завжди 1-й тиждень 
    const weekNumber = 1; 

    const baby = await getBabyByWeekNumber(weekNumber);
    const mom = await getMomBodyByWeekNumber(weekNumber);

    if (!baby || !mom) {
      return res.status(404).json({ message: "Дані початкового тижня не знайдено" });
    }

    // Розрахунок днів згідно ТЗ: не більше 39 тижнів у днях 
    const daysUntilBirth = 39 * 7; 

    // Формуємо відповідь згідно з потребами DashboardPage 
    return res.status(200).json({
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
      // Поради в ТЗ щоденні, для 1-го тижня повертаємо першу 
      momTip: baby.momDailyTips[0] 
    });
  } catch (error) {
    next(error);
  }
};