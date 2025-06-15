import dotenv from 'dotenv';
import path from 'path';
import { Sequelize } from 'sequelize';
import { initUserModel, User } from './models/user';
import { initSessionModel, Session } from './models/session';
import { initPluggyItemModel, PluggyItem } from './models/pluggyItem';
import { initGoalModel, Goal } from './models/goal';
import { initTransactionModel, Transaction } from './models/transaction';

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

export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
});

initUserModel(sequelize);
initSessionModel(sequelize);
initPluggyItemModel(sequelize);
initGoalModel(sequelize);
initTransactionModel(sequelize);

User.hasMany(Session, { foreignKey: 'user_id' });
Session.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(PluggyItem, { foreignKey: 'user_id', as: 'pluggyItems' });
PluggyItem.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Goal, { foreignKey: 'user_id', as: 'goals' });
Goal.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Transaction, { foreignKey: 'user_id', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

if (['development', 'test'].includes(process.env.NODE_ENV || '')) {
  sequelize.sync();
}

export { User, Session, PluggyItem, Goal, Transaction };
export default sequelize;
