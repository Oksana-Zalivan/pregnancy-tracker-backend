import createHttpError from 'http-errors';

import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  try {
    const { sessionId, accessToken } = req.cookies;

    if (!sessionId || !accessToken) {
      throw createHttpError(401, 'Користувач не авторизований');
    }

    const session = await Session.findOne({
      _id: sessionId,
      accessToken,
    });

    if (!session) {
      throw createHttpError(401, 'Користувач не авторизований');
    }

    const isAccessTokenExpired =
      new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
      throw createHttpError(401, 'Час дії access token сплив');
    }

    const user = await User.findById(session.userId);

    if (!user) {
      throw createHttpError(401, 'Користувач не авторизований');
    }

    req.user = user;
    req.session = session;

    next();
  } catch (error) {
    next(error);
  }
};
