import { registerUser } from "../services/authService.js";
import { loginUser } from "../services/authService.js";
import bcrypt from "bcrypt";

export const registerController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      message: "Реєстрація успішна",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login User

export const loginController = async (req, res) => {
  try {
    const user = await loginUser(req.body);

    const password = await passwordUser(req.body);

    const isValidPassword = await bcrypt;

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
