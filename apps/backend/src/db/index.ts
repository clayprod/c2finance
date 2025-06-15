import dotenv from 'dotenv';
import path from 'path';
import { Sequelize } from 'sequelize';
import { initUserModel, User } from './models/user';
import { initSessionModel, Session } from './models/session';
import { initPluggyItemModel, PluggyItem } from './models/pluggyItem';
import { initGoalModel, Goal } from './models/goal';
import { initTransactionModel, Transaction } from './models/transaction';
import { initAccountModel, Account } from './models/account';
import { initCategoryModel, Category } from './models/category';

const envFile =
  process.env.NODE_ENV === 'test'
    ? path.resolve(__dirname, '../../../../.env.test')
    : path.resolve(__dirname, '../../../../.env');

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
initGoalModel(sequelize);
initTransactionModel(sequelize);
initAccountModel(sequelize);
initCategoryModel(sequelize);

User.hasMany(Session, { foreignKey: 'user_id' });
Session.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(PluggyItem, { foreignKey: 'user_id', as: 'pluggyItems' });
PluggyItem.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Goal, { foreignKey: 'user_id', as: 'goals' });
Goal.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Transaction, { foreignKey: 'user_id', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Account, { foreignKey: 'user_id', as: 'accounts' });
Account.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Account.hasMany(Transaction, { foreignKey: 'account_id', as: 'transactions' });
Transaction.belongsTo(Account, { foreignKey: 'account_id', as: 'account' });

Category.hasMany(Transaction, { foreignKey: 'category_id', as: 'transactions' });
Category.hasMany(Goal, { foreignKey: 'category_id', as: 'goals' });
Transaction.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Goal.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

if (['development', 'test'].includes(process.env.NODE_ENV || '')) {
  sequelize.sync();
}
export {
  User,
  Session,
  PluggyItem,
  Account,
  Transaction,
  Category,
  Goal,
};
export default sequelize;
