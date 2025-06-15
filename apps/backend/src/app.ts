import express from 'express';
import authRoutes from './routes/auth';
import pluggyRoutes from './routes/pluggy';
import summaryRoutes from './routes/summary';
import goalRoutes from './routes/goals';
import dashboardRoutes from './routes/dashboard';
import advisorRoutes from './routes/advisor';

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(authRoutes);
  app.use(pluggyRoutes);
  app.use(summaryRoutes);
  app.use(goalRoutes);
  app.use(dashboardRoutes);
  app.use(advisorRoutes);
  return { app };
}

export default createApp;
