import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

export interface IDBMessage {
  topicId: number;
  userId: number;
  text: string;
  responseTo: number; // message.id сообщения, на которое отвечает. Если 0 - НЕ ответное сообщение.
}

export const messageModel: ModelAttributes<Model, IDBMessage> = {
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
