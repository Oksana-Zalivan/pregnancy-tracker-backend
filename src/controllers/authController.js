import {
  registerUser,
  loginUser,
  logoutUser,
  createSession,
  setSessionCookies,
  clearSessionCookies,
  refreshUserSession,
} from '../services/authService.js';

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  gender: user.gender,
  dueDate: user.dueDate,
  avatar: user.avatar,
});

export const registerController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    const session = await createSession(user._id);
    setSessionCookies(res, session);

    res.status(201).json({
      message: 'Реєстрація успішна',
      data: {
        user: sanitizeUser(user),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (req, res, next) => {
  try {
    const user = await loginUser(req.body);

    const session = await createSession(user._id);
    setSessionCookies(res, session);

    res.status(200).json({
      message: 'Вхід успішний',
      data: {
        user: sanitizeUser(user),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUserController = async (req, res, next) => {
  try {
    await logoutUser(req.cookies);

    clearSessionCookies(res);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const refreshTokenController = async (req, res, next) => {
  try {
    const newSession = await refreshUserSession(req.cookies);

    setSessionCookies(res, newSession);

    res.status(200).json({
      message: 'Сесію оновлено',
    });
  } catch (error) {
    next(error);
  }
};
