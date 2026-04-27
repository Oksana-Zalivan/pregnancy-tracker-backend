// Lib
import bcrypt from 'bcrypt';
// Services
import { loginUser } from '../services/authService.js';
import { registerUser } from '../services/authService.js';
// Models
import { Session } from '../models/session.js';
// Imports
import { createSession, setSessionCookies } from '../services/authService.js';

// Register controller
export const registerController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      message: 'Реєстрація успішна',
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

// Login controller
export const loginController = async (req, res, next) => {
  try {
    const user = await loginUser(req.body);

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// Logout controller
export const logoutUserController = async (req, res, next) => {
  try {
    await logoutUser(req.cookies);

    res.clearCookie('sessionId');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
