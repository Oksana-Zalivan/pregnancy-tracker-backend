import { BabyWeek, MomWeek } from "../models/Week.js";

// Отримуємо дані про дитину з БД[cite: 2, 3]
export const getBabyByWeekNumber = async (weekNumber) => {
  return await BabyWeek.findOne({ weekNumber }).lean();
};

// Отримуємо дані про тіло мами з БД
export const getMomBodyByWeekNumber = async (weekNumber) => {
  return await MomWeek.findOne({ weekNumber }).lean();
};

// Розрахунок днів до пологів згідно з ТЗ
export const calculateDaysToBirth = (weekNumber, dueDate) => {
  if (dueDate) {
    const diff = new Date(dueDate) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  }
  // Якщо dueDate немає, рахуємо різницю до 40 тижня
  return Math.max(0, (40 - weekNumber) * 7);
};