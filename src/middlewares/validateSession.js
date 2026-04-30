import { Session } from '../models/session.js';

export const validateSession = async (req, res, next) => {
  try {
    const { sessionId, refreshToken } = req.cookies;

    if (!sessionId || !refreshToken) {
      return res.status(401).json({
        message: 'Сесія невалідна або відсутня',
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
      return res.status(401).json({
        message: 'Час дії сесії сплив',
      });
    }

    req.session = session;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Сесія невалідна',
    });
  }
};
