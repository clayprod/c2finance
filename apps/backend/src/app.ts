import express from 'express';
codex/criar-testes-com-vitest-para-autenticação
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export function createApp() {
  const users = new Map<string, { email: string; passwordHash: string }>();
  const app = express();
  app.use(express.json());
  const secret = process.env.JWT_SECRET || 'secret';

  app.post('/register', async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
    if (users.has(email)) return res.status(409).json({ error: 'Email already in use' });
    const passwordHash = await bcrypt.hash(password, 10);
    users.set(email, { email, passwordHash });
    return res.status(201).json({ email });
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body || {};
    const user = email && users.get(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password || '', user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
    return res.json({ token });
  });

  app.get('/me', (req, res) => {
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const decoded = jwt.verify(auth.slice(7), secret) as { email: string };
      const user = users.get(decoded.email);
      if (!user) return res.status(401).json({ error: 'Unauthorized' });
      return res.json({ email: user.email });
    } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  });

  return { app, users };
}
=======
import authRoutes from './routes/auth';

const app = express();

app.use(express.json());
app.use(authRoutes);

export default app;
main
