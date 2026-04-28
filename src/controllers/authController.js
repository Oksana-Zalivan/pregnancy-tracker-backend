// Services
import {
  loginUser,
  registerUser,
  logoutUser,
} from '../services/authService.js';
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
export const loginUserController = async (req, res, next) => {
  try {
    const user = await loginUser(req.body);
    const newSession = await createSession(user._id);
    setSessionCookies(res, newSession);

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
