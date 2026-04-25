import { User } from "../models/user.js";

export const updateUser = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });
};

export const getUserById = async (userId) => {
  return await User.findById(userId);
};