import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  try {
    const { sessionId, refreshToken } = req.cookies;

    if (!sessionId || !refreshToken) {
      return res.status(401).json({
        message: 'Користувач не авторизований',
      });
    }

    const session = await Session.findOne({
      _id: sessionId,
      refreshToken,
    });

    if (!session) {
      return res.status(401).json({
        message: 'Сесія невалідна',
      });
    }

    const isExpired = new Date() > new Date(session.refreshTokenValidUntil);

    if (isExpired) {
      await Session.deleteOne({ _id: sessionId });

      return res.status(401).json({
        message: 'Сесія протермінована',
      });
    }

    const user = await User.findById(session.userId);

    if (!user) {
      return res.status(401).json({
        message: 'Користувача не знайдено',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
