import { DataTypes, Model } from 'sequelize';
import { sequelize, User } from '../../src/db';

export class Account extends Model {}
export class Category extends Model {}
export class Transaction extends Model {}

Account.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'accounts',
    underscored: true,
    timestamps: true,
  },
);

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'categories',
    underscored: true,
    timestamps: true,
  },
);

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    account_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'transactions',
    underscored: true,
    timestamps: true,
  },
);

User.hasMany(Account, { foreignKey: 'user_id' });
Account.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Category, { foreignKey: 'user_id' });
Category.belongsTo(User, { foreignKey: 'user_id' });

Account.hasMany(Transaction, { foreignKey: 'account_id' });
Transaction.belongsTo(Account, { foreignKey: 'account_id' });

Category.hasMany(Transaction, { foreignKey: 'category_id' });
Transaction.belongsTo(Category, { foreignKey: 'category_id' });

export async function seed() {
  await sequelize.sync({ force: true });

  const user = await User.create({
    name: 'Seed User',
    email: 'seed@example.com',
    password: 'pass',
  });

  const account = await Account.create({
    user_id: user.id,
    name: 'Checking',
    balance: 1000,
  });

  const category = await Category.create({
    user_id: user.id,
    name: 'General',
  });

  await Transaction.create({
    account_id: account.id,
    category_id: category.id,
    amount: -100,
  });
}

export const models = { User, Account, Category, Transaction };
