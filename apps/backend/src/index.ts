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

