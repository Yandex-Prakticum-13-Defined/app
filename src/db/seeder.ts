import { createMessage, createTopic } from './init';

export const seed = async () => {
  const topicId = await createTopic({
    title: 'Музыка в наших сердцах!',
    userId: 402,
    message: 'Всем привет! Кто не слышал легендарную пластинку The Romantics - рекомендую!'
  });

  await createTopic({
    title: 'Поговорим о погоде',
    userId: 17400,
    message: 'Во второй половине дня в Москве и области ожидаются небольшие дожди'
  });

  const messageId1 = await createMessage({
    topicId,
    userId: 402,
    text: 'https://www.youtube.com/watch?v=I-wQEasgPbA&list=PL7_q6PqwRaY6vgyZ8lOnCDiu3ctx_DhAu&index=2',
    responseTo: 0
  });

  const messageId2 = await createMessage({
    topicId,
    userId: 17627,
    text: 'Sounds good! Мне нравится классика ) Dire Straits, Mark Knopfler, Eric Clapton...',
    responseTo: messageId1
  });

  const messageId3 = await createMessage({
    topicId,
    userId: 17388,
    text: 'Классный альбом! Помню был на их концерте.',
    responseTo: messageId2
  });

  await createMessage({
    topicId,
    userId: 4199,
    text: 'Как вам? https://www.youtube.com/watch?v=szdjUJIqVSQ&list=PL7_q6PqwRaY6vgyZ8lOnCDiu3ctx_DhAu&index=4',
    responseTo: messageId3
  });

  await createMessage({
    topicId,
    userId: 17388,
    text: 'Ответ на первое сообщение',
    responseTo: messageId1
  });
};
