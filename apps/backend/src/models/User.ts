import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';

export interface UserAttributes {
  id: string;
  name?: string | null;
  email: string;
  passwordHash: string;
  plan: 'free' | 'pro';
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'plan'>;

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public name!: string | null;
  public email!: string;
  public passwordHash!: string;
  public plan!: 'free' | 'pro';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plan: {
      type: DataTypes.ENUM('free', 'pro'),
      allowNull: false,
      defaultValue: 'free',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  },
);

export default User;
