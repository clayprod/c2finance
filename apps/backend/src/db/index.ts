import { Sequelize } from 'sequelize';
codex/definir-modelos-user-e-session
import { config } from 'dotenv';
import { initUserModel, User } from './models/user';
import { initSessionModel, Session } from './models/session';

config();

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  logging: false,
});

initUserModel(sequelize);
initSessionModel(sequelize);

User.hasMany(Session, { foreignKey: 'user_id' });
Session.belongsTo(User, { foreignKey: 'user_id' });

if (['development', 'test'].includes(process.env.NODE_ENV || '')) {
  sequelize.sync();
}

export { User, Session };
=======
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
main
