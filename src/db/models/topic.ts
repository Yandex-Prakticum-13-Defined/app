import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

export interface ITopic {
  title: string;
  userId: number;
  message: string;
}

export const topicModel: ModelAttributes<Model, ITopic> = {
  title: {
    type: DataType.STRING,
    allowNull: false
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false
  },
  message: {
    type: DataType.STRING,
    allowNull: false
  }
};
