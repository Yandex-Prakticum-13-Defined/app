import { logB, logG, logR } from '../utils/log';
import { Message, sequelize, Topic } from './config';
import { ITopic } from './models/topic';
import { IMessage } from './models/message';
import { seed } from './seeder';

/**
 * Создание топика
 * @param topic - объект ITopic
 */
export const createTopic = async (topic: ITopic) => {
  const newTopic = await Topic.create({ ...topic });

  return newTopic.id;
};

/**
 * Создание сообщения.
 * @param message - объект IMessage
 */
export const createMessage = async (message: IMessage) => {
  const newMessage = await Message.create({ ...message });

  return newMessage.id;
};

/**
 * Получение всех топиков.
 */
export const getAllTopics = async () => Topic.findAll();

/**
 * Получение всех сообщений заданного топика.
 */
export const getAllTopicMessages = async (topicId: number) => Message.findAll({
  where: { topicId }
});

/**
 * Получение кол-ва записей в таблице "Topics".
 */
const getTopicCount = async () => Topic.count();

/**
 * Получение кол-ва сообщений для заданного топика.
 * @param topicId - id топика
 */
export const getMessagesCountByTopic = async (topicId: number) => Message.count({
  where: { topicId }
});

/**
 * Подключение к БД.
 */
export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync(); // Синхронизация базы данных
    logG('Connection has been established successfully!');
  } catch (err) {
    logR(`Unable to connect to the database. Error: ${(err as Error).message}`);
  }
}

export const initDb = async () => {
  await dbConnect();

  try {
    const topicCount = await getTopicCount();
    // Если в таблице нет записей- засеиваем её
    if (topicCount < 1) {
      await seed();
      logG('The database has been seeded successfully!');
    } else {
      logB('The database is not empty - seeding aborted.');
    }
  } catch (err) {
    logR(`Seeding error occur! ${(err as Error).message}`);
  }
};

initDb();
