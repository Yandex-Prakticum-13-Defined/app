import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { topicModel } from './models/topic';
import { messageModel } from './models/message';

const sequelizeOptions: SequelizeOptions = {
  host: process.env.ENVIRONMENT === 'DEV' ? 'localhost' : 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'newPassword',
  database: 'arkanoid-db',
  dialect: 'postgres',
  query: { raw: true }
};

// Создаем инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions);

// Инициализируем модели
export const Topic = sequelize.define('Topic', topicModel, {
  timestamps: true,
  createdAt: true,
  updatedAt: false
});

export const Message = sequelize.define('Message', messageModel, {
  timestamps: true,
  createdAt: true,
  updatedAt: false
});
