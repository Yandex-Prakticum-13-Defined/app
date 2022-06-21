import { IDBTopic } from '../db/models/topic';
import { IDBMessage } from '../db/models/message';
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
}

export const createTopic = (topic: IDBTopic): Promise<string> => server.post('topic', { topic });

export const createMessage = (message: IDBMessage): Promise<string> => server.post('message', { message });

export const getAllTopics = async (): Promise<ITopic[]> => {
  const response = await server.get('topics');

  return response.data;
};

export const getMessagesByTopicId = async (topicId: number): Promise<IMessage[]> => {
  const response = await server.post('messages', { topicId });

  return response.data;
};
