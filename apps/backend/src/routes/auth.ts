import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../db/models/user';
import { Session } from '../db/models/session';

const router = Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }
  const user = await User.create({ email, password, name: email });
  res.status(201).json({ id: user.id, email: user.email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  const valid = await bcrypt.compare(password || '', user.password_hash);
  if (!valid) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  const secret = process.env.JWT_SECRET || 'secret';
  const token = jwt.sign({ userId: user.id }, secret);
  await Session.create({
    user_id: user.id,
    token,
    expires_at: new Date(Date.now() + 60 * 60 * 1000),
  });
  res.json({ token });
});

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
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
    (req as any).user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

router.get('/me', authMiddleware, (req, res) => {
  const user = (req as any).user as User;
  res.json({ id: user.id, email: user.email });
});

export default router;
