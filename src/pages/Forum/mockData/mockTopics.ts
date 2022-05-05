import { TTopic } from '../components/ForumTopics/ForumTopics';

export const topics: TTopic[] = [
  {
    id: '1',
    title: 'Тема о футболе',
    authorName: 'Златан',
    authorPicture: 'https://tinyurl.com/bdznfmzs',
    createdAt: '2022-01-05 19:08',
    lastMessage: 'Извиняюсь за оффтоп! Нашёл классное свойство text-overflow: ellipsis,'
      + ' которое ставит многоточие, если сообщение не помещается в указанную ширину',
    messagesCount: 14
  },
  {
    id: '2',
    title: 'Тема о музыке',
    authorName: 'Алекси',
    authorPicture: 'https://tinyurl.com/bdznfmzs',
    createdAt: '2022-01-05 20:14',
    lastMessage: 'Всем привет!',
    messagesCount: 1
  }
];
