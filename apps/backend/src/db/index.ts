import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.NODE_ENV === 'test'
  ? path.resolve(__dirname, '../../../.env.test')
  : path.resolve(__dirname, '../../../.env');

dotenv.config({ path: envFile });

const databaseUrl = process.env.NODE_ENV === 'test'
  ? process.env.DATABASE_URL_TEST
  : process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('Database URL not provided');
}

export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
