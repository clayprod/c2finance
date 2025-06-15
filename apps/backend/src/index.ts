import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import sequelize from './models';

const port = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
  }
})();
