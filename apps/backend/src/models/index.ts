import { Sequelize } from 'sequelize';

const databaseUrl =
  process.env.NODE_ENV === 'test'
    ? 'sqlite::memory:'
    : (process.env.DATABASE_URL as string);

export const sequelize = new Sequelize(databaseUrl, {
  dialect: process.env.NODE_ENV === 'test' ? 'sqlite' : 'postgres',
  logging: false,
});

export default sequelize;
