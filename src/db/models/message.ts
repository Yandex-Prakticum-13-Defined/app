import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

export interface IMessage {
  topicId: number;
  userId: number;
  text: string;
  responseTo: number; // 0 - НЕ ответ
}

export const messageModel: ModelAttributes<Model, IMessage> = {
  topicId: {
    type: DataType.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false
  },
  text: {
    type: DataType.STRING,
    allowNull: false
  },
  responseTo: {
    type: DataType.INTEGER,
    allowNull: false
  }
};
