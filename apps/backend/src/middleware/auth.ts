import { Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { Session } from '../db/models/session';
import { User } from '../db/models/user';
import { AuthRequest } from '../types/authRequest';

export const authMiddleware: RequestHandler = async (
  req,
  res: Response,
  next: NextFunction,
) => {
  const auth = req.header('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const token = auth.substring(7);
  try {
    const secret = process.env.JWT_SECRET || 'secret';
    const payload = jwt.verify(token, secret) as { userId: string };
    const session = await Session.findOne({ where: { token } });
    if (!session || session.user_id !== payload.userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const user = await User.findByPk(payload.userId);
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    (req as AuthRequest).user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
