import jwt from 'jsonwebtoken';
import {
  registerUser,
  loginUser,
  logoutUser,
  createSession,
  setSessionCookies,
  refreshToken,
} from '../services/authService.js';

// Register controller
export const registerController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.status(201).json({
      message: 'Реєстрація успішна',
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

// Login controller
export const loginUserController = async (req, res, next) => {
  try {
    const user = await loginUser(req.body);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    const newSession = await createSession(user._id);
    setSessionCookies(res, newSession);

    res.status(200).json({
      message: 'Вхід успішний',
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

export const refreshTokenController = async (req, res, next) => {
  try {
    const newSession = await refreshToken(req.cookies);

    setSessionCookies(res, newSession);

    res.json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
};