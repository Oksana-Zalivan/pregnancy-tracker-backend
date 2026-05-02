import { BabyWeek, MomWeek } from "../models/week.js";

const MS_IN_DAY = 1000 * 60 * 60 * 24;
const TOTAL_PREGNANCY_DAYS = 280; // 40 тижнів * 7 днів

// Отримуємо дані про дитину з БД
export const getBabyByWeekNumber = async (weekNumber) => {
  return await BabyWeek.findOne({ weekNumber }).lean();
};

// Отримуємо дані про тіло мами з БД
export const getMomBodyByWeekNumber = async (weekNumber) => {
  return await MomWeek.findOne({ weekNumber }).lean();
};

export const calculateCurrentWeek = (dueDate) => {
if(!dueDate) return null;
const remainingDays = Math.ceil((new Date(dueDate) - new Date()) / MS_IN_DAY);
const passedDays = TOTAL_PREGNANCY_DAYS - remainingDays;
const currentWeek = Math.ceil(passedDays / 7);

return Math.min(Math.max(currentWeek, 1), 40);
};


// Розрахунок днів до пологів згідно з ТЗ
export const calculateDaysToBirth = (weekNumber, dueDate) => {
  if (dueDate) {
    const diff = new Date(dueDate) - new Date();
    const days = Math.ceil(diff / MS_IN_DAY);
    return days > 0 ? days : 0;
  }
  // Якщо dueDate немає, рахуємо різницю до 40 тижня
  return Math.max(0, (40 - weekNumber) * 7);
};