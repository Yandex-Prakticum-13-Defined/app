import { getMessagesByTopicId, getTopicMessage } from '../db/init';
import { getUserByIdSSR } from '../API/authAPI';
import { IMessage } from '../API/forumAPI';
import { IDBMessageDataEx, orderMessages } from './orderMessages';
import { getDate } from './getDate';

export const getMessages = async (topicId: number, cookie: string): Promise<IMessage[]> => {
  const firstMessage = await getTopicMessage(topicId);
  const messagesDBExceptFirst = await getMessagesByTopicId(topicId);
  const messagesDBAll = [firstMessage, ...messagesDBExceptFirst];
  const orderedMessages: IDBMessageDataEx[] = orderMessages(messagesDBAll, 0, 0);
  const users = await Promise.all(orderedMessages.map((message) => getUserByIdSSR(message.userId, cookie)));

  return orderedMessages.map((message, index) => ({
    topicTitle: message.topicTitle,
    id: message.id,
    authorName: users[index].first_name,
    authorPicture: users[index].avatar,
    date: getDate(message.createdAt),
    text: message.text,
    offsetLevel: message.offsetLevel || 0
  }));
};
