import jwt from "jsonwebtoken";
import { registerUser } from "../services/authService.js";

export const registerController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "Реєстрація успішна",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
