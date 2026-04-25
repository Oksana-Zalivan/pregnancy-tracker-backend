import User from "../models/user.js";
import * as userService from "../services/userService.js";

export const getCurrentUserController = (req, res) => {
  res.json({
    message: "Поточний користувач успішно отриманий",
    data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
};

export const updateUserProfileController = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const updatedUser = await userService.updateUser(_id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    res.json({
      message: "Профіль успішно оновлено",
      data: {
        name: updatedUser.name,
        email: updatedUser.email,
        gender: updatedUser.gender,
        dueDate: updatedUser.dueDate,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};
