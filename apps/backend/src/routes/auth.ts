import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../db/models/user';
import { AuthRequest } from '../types/authRequest';
import { Session } from '../db/models/session';
import { authMiddleware } from '../middleware/auth';

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


router.get('/me', authMiddleware, (req: AuthRequest, res) => {
  const user = req.user;
  res.json({ id: user.id, email: user.email });
});

export default router;
