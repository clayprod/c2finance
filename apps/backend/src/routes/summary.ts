import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/summary', authMiddleware, (req, res) => {
  res.json({
    income: 1000,
    expenses: 800,
    balance: 200,
    history: [
      { month: 'Jan', value: 100 },
      { month: 'Feb', value: 200 },
      { month: 'Mar', value: 300 },
    ],
  });
});

export default router;
