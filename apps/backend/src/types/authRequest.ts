import { Request } from 'express';
import { User } from '../db/models/user';

export interface AuthRequest extends Request {
  user: User;
}
