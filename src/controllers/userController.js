import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import * as userService from "../services/userService.js";
import { User } from "../models/user.js";

export const getCurrentUserController = (req, res) => {
  res.json({
    message: "Поточний користувач успішно отриманий",
    data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      gender: req.user.gender,
      dueDate: req.user.dueDate,
      avatar: req.user.avatar,
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

export const updateUserAvatar = async (req, res, next) => {
  try {
  if (!req.file) {
    throw createHttpError(400, "Файл не передано");
  }

  const result = await saveFileToCloudinary(req.file.buffer);
  if (!result) {
    throw createHttpError(500, "Помилка завантаження аватара");
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar: result.secure_url },
    { returnDocument: "after" },
  );
  if (!user) {
    throw createHttpError(500, "Помилка оновлення аватара користувача");
  }

  res.status(200).json({ 
    message: "Аватар успішно оновлено",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      gender:user.gender,
      dueDate: user.dueDate,
      avatar: user.avatar,
    },
  });
  } catch (error) {
    next (error);
  }
};

