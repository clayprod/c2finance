import express from 'express';
import authRoutes from './routes/auth';
import pluggyRoutes from './routes/pluggy';
import summaryRoutes from './routes/summary';
import advisorRoutes from './routes/advisor';

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(authRoutes);
  app.use(pluggyRoutes);
  app.use(summaryRoutes);
  app.use(advisorRoutes);
  return { app };
}

export default createApp;
