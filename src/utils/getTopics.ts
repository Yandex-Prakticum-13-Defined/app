import { getAllTopics, getMessagesCountByTopicId } from '../db/init';
import { getUserByIdSSR } from '../API/authAPI';
import { ITopic } from '../API/forumAPI';
import { getDate } from './getDate';

export const getTopics = async (cookie: string): Promise<ITopic[]> => {
  const topicsDB = await getAllTopics();
  const users = await Promise.all(topicsDB.map((topic) => getUserByIdSSR(topic.userId, cookie)));
  const messagesCount = await Promise.all(topicsDB.map((topic) => getMessagesCountByTopicId(topic.id)));

  return topicsDB.map((topic, index) => ({
    id: topic.id,
    title: topic.title,
    authorName: users[index].first_name,
    authorPicture: users[index].avatar,
    createdAt: getDate(topic.createdAt),
    message: topic.message,
    messagesCount: messagesCount[index] + 1
  }));
};
