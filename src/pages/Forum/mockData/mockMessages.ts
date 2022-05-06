import { TMessage } from '../components/ForumTopic/ForumTopic';

export const messages: TMessage[] = [
  {
    id: '1',
    authorName: 'Автор1',
    authorPicture: 'https://tinyurl.com/bdznfmzs',
    date: '2022-05-01 10:57',
    text: 'Всем привет!',
    isResponse: false
  },
  {
    id: '3',
    authorName: 'Автор3',
    authorPicture: 'https://tinyurl.com/bdznfmzs',
    date: '2022-05-02 10:27',
    text: 'Пример дерева комментариев',
    isResponse: true
  },
  {
    id: '4',
    authorName: 'Автор4',
    authorPicture: 'https://tinyurl.com/bdznfmzs',
    date: '2022-05-02 11:11',
    text: 'Ещё комментарий',
    isResponse: true
  },
  {
    id: '2',
    authorName: 'Автор2',
    authorPicture: 'https://tinyurl.com/bdznfmzs',
    date: '2022-05-01 11:29',
    text: 'И тебе привет!',
    isResponse: false
  }
];
