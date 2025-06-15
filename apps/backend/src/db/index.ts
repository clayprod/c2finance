import dotenv from 'dotenv';
import path from 'path';
import { Sequelize } from 'sequelize';
import { initUserModel, User } from './models/user';
import { initSessionModel, Session } from './models/session';
import { initPluggyItemModel, PluggyItem } from './models/pluggyItem';

const envFile =
  process.env.NODE_ENV === 'test'
    ? path.resolve(__dirname, '../../../.env.test')
    : path.resolve(__dirname, '../../../.env');

dotenv.config({ path: envFile });

const databaseUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.DATABASE_URL_TEST
    : process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('Database URL not provided');
}

const dialect = databaseUrl.startsWith('sqlite') ? 'sqlite' : 'postgres';

export const sequelize = new Sequelize(databaseUrl, {
  dialect: dialect as any,
  logging: false,
});

initUserModel(sequelize);
initSessionModel(sequelize);
initPluggyItemModel(sequelize);

User.hasMany(Session, { foreignKey: 'user_id' });
Session.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(PluggyItem, { foreignKey: 'user_id', as: 'pluggyItems' });
PluggyItem.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

if (['development', 'test'].includes(process.env.NODE_ENV || '')) {
  sequelize.sync();
}

export { User, Session, PluggyItem };
export default sequelize;
