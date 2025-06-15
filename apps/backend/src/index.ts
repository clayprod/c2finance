import express from 'express';
import sequelize from './config/database';

const app = express();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    app.get('/', (_req, res) => {
      res.json({ ok: true });
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
