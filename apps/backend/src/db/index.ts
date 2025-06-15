import { Sequelize } from 'sequelize';
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
