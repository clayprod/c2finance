import { Router } from 'express';
import { PluggyItem } from '../db/models/pluggyItem';
import { authMiddleware } from '../middleware/auth';
import { AuthRequest } from '../types/authRequest';

const router = Router();

router.post('/pluggy/item', authMiddleware, async (req: AuthRequest, res) => {
  const { pluggyItemId } = req.body || {};
  if (!pluggyItemId) {
    res.status(400).json({ message: 'pluggyItemId is required' });
    return;
  }
  const user = req.user;
  const item = await PluggyItem.create({
    user_id: user.id,
    pluggy_item_id: pluggyItemId,
  });
  res.status(201).json(item);
});

export default router;
