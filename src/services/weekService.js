import { BabyWeek, MomWeek } from "../models/Week.js";

export const getBabyByWeekNumber = async (weekNumber) => {
  return await BabyWeek.findOne({ weekNumber }).lean();
};

export const getMomBodyByWeekNumber = async (weekNumber) => {
  return await MomWeek.findOne({ weekNumber }).lean();
};
