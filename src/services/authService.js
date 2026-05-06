import bcrypt from 'bcrypt';
import crypto from 'crypto';
import createHttpError from 'http-errors';

import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';

export const registerUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw createHttpError(409, 'Користувач з таким email вже існує');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return await User.create({
    ...payload,
    password: hashedPassword,
  });
};

export const loginUser = async (payload) => {
  const { email, password } = payload;

  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Невірний email або пароль');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw createHttpError(401, 'Невірний email або пароль');
  }

  await Session.deleteMany({ userId: user._id });

  return user;
};

export const logoutUser = async (cookies) => {
  if (!cookies?.sessionId) {
    return;
  }

  await Session.deleteOne({ _id: cookies.sessionId });
};

export const createSession = async (userId) => {
  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return await Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

const getCookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge,
  path: '/',
});

export const setSessionCookies = (res, session) => {
  res.cookie(
    'accessToken',
    session.accessToken,
    getCookieOptions(FIFTEEN_MINUTES),
  );

  res.cookie('refreshToken', session.refreshToken, getCookieOptions(ONE_DAY));

  res.cookie('sessionId', session._id.toString(), getCookieOptions(ONE_DAY));
};

export const clearSessionCookies = (res) => {
  const cookieOptions = getCookieOptions(0);

  res.clearCookie('accessToken', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);
  res.clearCookie('sessionId', cookieOptions);
};

export const refreshUserSession = async (cookies) => {
  const { sessionId, refreshToken } = cookies;

  if (!sessionId || !refreshToken) {
    throw createHttpError(401, 'Сесія відсутня');
  }

  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Сесію не знайдено');
  }

  const isExpired = new Date() > new Date(session.refreshTokenValidUntil);

  if (isExpired) {
    await Session.deleteOne({ _id: sessionId });

    throw createHttpError(401, 'Час дії сесії сплив');
  }

  await Session.deleteOne({ _id: sessionId });

  return await createSession(session.userId);
};
