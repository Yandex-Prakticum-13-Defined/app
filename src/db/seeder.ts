import { createMessage, createTopic } from './init';

export const seed = async () => {
  const topicId = await createTopic({
    title: 'О том - о сём... ',
    userId: 1876,
    message: 'Всем привет! Кто не слышал легендарную пластинку The Romantics - Talking in your sleep - рекомендую!'
  });

  await createTopic({
    title: 'Поговорим о погоде',
    userId: 2069,
    message: 'Во второй половине дня в Москве и области ожидаются небольшие дожди'
  });

  const messageId1 = await createMessage({
    topicId,
    userId: 1876,
    text: 'https://www.youtube.com/watch?v=I-wQEasgPbA&list=PL7_q6PqwRaY6vgyZ8lOnCDiu3ctx_DhAu&index=2',
    responseTo: 0
  });

  const messageId2 = await createMessage({
    topicId,
    userId: 2086,
    text: 'Sounds good! Мне нравится классика ) Dire Straits, Mark Knopfler, Eric Clapton...',
    responseTo: messageId1
  });

  const messageId3 = await createMessage({
    topicId,
    userId: 2093,
    text: 'Классный альбом! Помню был на их концерте.',
    responseTo: messageId2
  });

  await createMessage({
    topicId,
    userId: 2117,
    text: 'Как вам? https://www.youtube.com/watch?v=szdjUJIqVSQ&list=PL7_q6PqwRaY6vgyZ8lOnCDiu3ctx_DhAu&index=4',
    responseTo: messageId3
  });

  await createMessage({
    topicId,
    userId: 2069,
    text: 'ЗачОтный трек!',
    responseTo: messageId1
  });
};
