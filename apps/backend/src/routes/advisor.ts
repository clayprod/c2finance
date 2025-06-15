import { Router } from 'express';

const router = Router();

router.get('/advisor/suggestion', (_req, res) => {
  res.json({ suggestion: 'Consider saving 10% of your income this month' });
});

export default router;
