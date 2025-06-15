import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/advisor/messages', authMiddleware, (_req, res) => {
  res.json([
    { id: 1, text: 'Keep saving 10% of your income.' },
    { id: 2, text: 'Consider reducing discretionary spending.' },
  ]);
});

router.get('/advisor/suggestion', (_req, res) => {
  res.json({ suggestion: 'Consider saving 10% of your income this month' });
});

export default router;
