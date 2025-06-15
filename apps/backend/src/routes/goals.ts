import { Router } from 'express';
import { Goal } from '../db/models/goal';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/goals', authMiddleware, async (req, res) => {
  const user = req.user!;
  const { month, amount } = req.body || {};
  if (!month || typeof amount !== 'number') {
    res.status(400).json({ message: 'month and amount are required' });
    return;
  }
  const goal = await Goal.create({ user_id: user.id, month, amount });
  res.status(201).json(goal);
});

router.get('/goals', authMiddleware, async (req, res) => {
  const user = req.user!;
  const goals = await Goal.findAll({ where: { user_id: user.id } });
  res.json(goals);
});

router.put('/goals/:id', authMiddleware, async (req, res) => {
  const user = req.user!;
  const { id } = req.params;
  const { month, amount } = req.body || {};
  const goal = await Goal.findOne({ where: { id, user_id: user.id } });
  if (!goal) {
    res.status(404).json({ message: 'Goal not found' });
    return;
  }
  await goal.update({ month: month ?? goal.month, amount: amount ?? goal.amount });
  res.json(goal);
});

router.delete('/goals/:id', authMiddleware, async (req, res) => {
  const user = req.user!;
  const { id } = req.params;
  const goal = await Goal.findOne({ where: { id, user_id: user.id } });
  if (!goal) {
    res.status(404).json({ message: 'Goal not found' });
    return;
  }
  await goal.destroy();
  res.status(204).send();
});

export default router;
