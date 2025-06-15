import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface User {
  id: number;
  email: string;
  passwordHash: string;
}

const users: User[] = [];
const sessions: Record<string, number> = {};

const router = Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }
  if (users.find((u) => u.email === email)) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = { id: users.length + 1, email, passwordHash };
  users.push(user);
  res.status(201).json({ id: user.id, email: user.email });
  return;
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  const secret = process.env.JWT_SECRET || 'secret';
  const token = jwt.sign({ userId: user.id }, secret);
  sessions[token] = user.id;
  res.json({ token });
  return;
});

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.header('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const token = auth.substring(7);
  try {
    const secret = process.env.JWT_SECRET || 'secret';
    const payload = jwt.verify(token, secret) as { userId: number };
    const userId = sessions[token];
    if (!userId || userId !== payload.userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const user = users.find((u) => u.id === userId);
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    (req as any).user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
}

router.get('/me', authMiddleware, (req, res) => {
  const user = (req as any).user as User;
  res.json({ id: user.id, email: user.email });
});

export default router;
export { users, sessions };
