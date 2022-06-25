import { getMessagesByTopicId } from '../db/init';
import { getUserByIdSSR } from '../API/authAPI';
import { IMessage } from '../API/forumAPI';
import { IDBMessageDataEx, orderMessages } from './orderMessages';
import { getDate } from './getDate';

export const getMessages = async (topicId: number, cookie: string): Promise<IMessage[]> => {
  const messagesDB = await getMessagesByTopicId(topicId);
  const users = await Promise.all(messagesDB.map((message) => getUserByIdSSR(message.userId, cookie)));
  const orderedMessages: IDBMessageDataEx[] = orderMessages(messagesDB, 0, 0);

  return orderedMessages.map((message, index) => ({
    id: message.id,
    authorName: users[index].first_name,
    authorPicture: users[index].avatar,
    date: getDate(message.createdAt),
    text: message.text,
    offsetLevel: message.offsetLevel || 0
  }));
};
