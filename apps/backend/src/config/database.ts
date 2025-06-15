import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

if (env === 'test') {
  const envPath = path.resolve(process.cwd(), '../..', '.env.test');
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const databaseUrl =
  env === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined');
}

const sequelize = new Sequelize(databaseUrl, { logging: false });

export default sequelize;
