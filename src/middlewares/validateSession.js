import createHttpError from 'http-errors';
import { Session } from '../models/session.js';

export const validateSession = async (req, res, next) => {
  try {
    const { sessionId, refreshToken } = req.cookies;

    if (!sessionId || !refreshToken) {
      throw createHttpError(401, 'Сесія відсутня');
    }

    const session = await Session.findOne({
      _id: sessionId,
      refreshToken,
    });

    if (!session) {
      throw createHttpError(401, 'Сесія невалідна');
    }

    const isExpired = new Date() > new Date(session.refreshTokenValidUntil);

    if (isExpired) {
      await Session.deleteOne({ _id: sessionId });

      throw createHttpError(401, 'Час дії сесії сплив');
    }

    req.session = session;

    next();
  } catch (error) {
    next(error);
  }
};
