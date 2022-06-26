import { IDBTopic } from '../db/models/topic';
import { IDBMessage } from '../db/models/message';
import { EDBRoutes } from '../utils/constants/routes';
import { server } from './API';

export interface ITopic {
  id: number;
  title: string;
  authorName: string;
  authorPicture: string | null;
  createdAt: string;
  message: string;
  messagesCount: number;
}

export interface IMessage {
  id: number;
  authorName: string;
  authorPicture: string | null;
  date: string;
  text: string;
  offsetLevel: number;
  topicTitle?: string;
}

export const createTopic = async (topic: IDBTopic): Promise<string> => {
  const response = await server.post(EDBRoutes.TOPIC, { topic });

  return response.data;
};

export const createMessage = async (message: IDBMessage): Promise<string> => {
  const response = await server.post(EDBRoutes.MESSAGE, { message });

  return response.data;
};

export const getAllTopics = async (): Promise<ITopic[]> => {
  const response = await server.get(EDBRoutes.TOPICS);

  return response.data;
};

export const getMessagesByTopicId = async (topicId: number): Promise<IMessage[]> => {
  const response = await server.post(EDBRoutes.MESSAGES, { topicId });

  return response.data;
};
