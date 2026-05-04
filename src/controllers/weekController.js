import {
  getBabyByWeekNumber,
  getMomBodyByWeekNumber,
} from "../services/weekService.js";

export const getBabyByWeek = async (req, res, next) => {
  try {
    const weekNumber = Number(req.params.weekNumber);

    if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 40) {
      return res.status(400).json({
        message: "Номер тижня має бути цілим числом від 1 до 40 ",
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

    if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 40) {
      return res.status(400).json({
        message: "Номер тижня має бути цілим числом від 1 до 40",
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

    const [baby, mom] = await Promise.all([
      weekService.getBabyByWeekNumber(weekNumber),
      weekService.getMomBodyByWeekNumber(weekNumber)
    ]);

    if (!baby || !mom) {
      return res
        .status(404)
        .json({ message: "Дані початкового тижня не знайдено" });
    }

    const daysUntilBirth = 40 * 7; 

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
      momTip: baby.momDailyTips[0] ?? null,
    });
  } catch (error) {
    next(error);
  }
};

export const getPrivateCurrentWeek = async (req, res, next) => {
  try {
    const userId = req.user;
    
    if (!user) {
      return res.status(404).json({
        message: "Користувача не знайдено",
      });
    }

    const today = new Date();

    let daysUntilBirth = 280;
    let passedDays = 0;

    if (user.dueDate) {
      const dueDate = new Date(user.dueDate);
      daysUntilBirth = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
      // Розраховуємо, скільки днів вже пройшло від початку вагітності
      passedDays = 280 - daysUntilBirth;
    } 
    
    let weekNumber = Math.floor(passedDays / 7) + 1;

        if (weekNumber < 1) weekNumber = 1;
    if (weekNumber > 40) weekNumber = 40;

    if (daysUntilBirth < 0) daysUntilBirth = 0;
    
     const [baby, mom] = await Promise.all([
      getBabyByWeekNumber(weekNumber),
      getMomBodyByWeekNumber(weekNumber),
    ]);

    if (!baby || !mom) {
      return res.status(404).json({
        message: `Дані для ${weekNumber} тижня не знайдено`,
      });
    }

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
      momTip: baby.momDailyTips?.[0] ?? null,
    });
  } catch (error) {
    next(error);
  }
};

