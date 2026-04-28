import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';


export const registerUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new Error('Користувач з таким email вже існує');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return user;
};

// This is the User Login logic
export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error('Користувача з таким email чи паролем не існує!');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error('Користувача з таким email чи паролем не існує!');
  }

  await Session.deleteOne({ userId: user._id });

  return user;
};

// This is the user Logout logic
export const logoutUser = async (cookies) => {
  if (!cookies?.sessionId) {
    return;
  }
  await Session.deleteOne({ _id: cookies.sessionId });
};

// This is the Session logic
export const createSession = async (userId) => {
  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

// Session cookies
export const setSessionCookies = (res, session) => {
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: FIFTEEN_MINUTES,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ONE_DAY,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ONE_DAY,
  });
};
