codex/criar-testes-com-vitest-para-autenticação
import { createApp } from './app';
import dotenv from 'dotenv';

dotenv.config();

const { app } = createApp();
const port = process.env.PORT || 3000;
app.listen(Number(port), () => {
  console.log(`Server running on port ${port}`);
});
=======
codex/criar-rotas-de-autenticação-e-atualizar-app.ts
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
import express from 'express';
import sequelize from './db';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.get('/', (_req, res) => {
  res.send('ok');
});

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error('Unable to connect to database:', err);
  }
}

start();

main
main
