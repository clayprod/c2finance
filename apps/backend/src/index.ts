import dotenv from 'dotenv';
import { createApp } from './app';
import sequelize from './db';

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');
    const { app } = createApp();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to database:', err);
  }
}

start();
