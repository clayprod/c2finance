import express from 'express';
import authRoutes from './routes/auth';
import pluggyRoutes from './routes/pluggy';

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(authRoutes);
  app.use(pluggyRoutes);
  return { app };
}

export default createApp;
