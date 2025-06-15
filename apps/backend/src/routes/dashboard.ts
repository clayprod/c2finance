import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { Goal } from '../db/models/goal';
import { Transaction } from '../db/models/transaction';

const router = Router();

router.get('/dashboard/monthly', authMiddleware, async (req, res) => {
  const user = req.user!;
  const goals = await Goal.findAll({ where: { user_id: user.id } });
  const transactions = await Transaction.findAll({ where: { user_id: user.id } });

  const sums: Record<string, number> = {};
  for (const tx of transactions) {
    const month = tx.date.toISOString().slice(0, 7);
    sums[month] = (sums[month] || 0) + tx.amount;
  }

  const result = goals.map((goal) => ({
    month: goal.month,
    goal: goal.amount,
    spent: sums[goal.month] || 0,
  }));

  res.json(result);
});

export default router;
