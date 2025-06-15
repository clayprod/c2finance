import express from 'express';
import authRoutes from './routes/auth';

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(authRoutes);
  return { app };
}

export default createApp;
