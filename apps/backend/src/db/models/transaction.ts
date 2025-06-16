import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class Transaction extends Model<
  InferAttributes<Transaction>,
  InferCreationAttributes<Transaction>
> {
  declare id: CreationOptional<string>;
  declare account_id: string | null;
  declare user_id: string;
  declare category_id: string | null;
  declare amount: number;
  declare description: CreationOptional<string>;
  declare date: CreationOptional<Date>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

export function initTransactionModel(sequelize: Sequelize) {
  Transaction.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      account_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'transactions',

      underscored: true,
      timestamps: true,
    },
  );

  return Transaction;
}
