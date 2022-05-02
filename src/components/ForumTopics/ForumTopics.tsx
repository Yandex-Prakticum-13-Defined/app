import React from 'react';
import './ForumTopics.scss';
import ForumTopic from '../ForumTopicCard/ForumTopicCard';

export type TTopic = {
  id: string;
  title: string;
  authorName: string;
  authorPicture: string;
  createdAt: string;
  lastMessage: string;
  messagesCount: number;
};

function ForumTopics() {
  const topics: TTopic[] = [
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

  return (
    <div className='forum-topics'>
      <form className='forum-topics__form'>
        <button className='forum-topics__button' type='submit'>Создать новую тему</button>
        <input className='forum-topics__input' type='text' placeholder='Введите название темы'/>
        <textarea className='forum-topics__textarea' placeholder='Введите ваше сообщение'></textarea>
      </form>
      {
        topics.map((topic) => (
          <ForumTopic key={topic.id}
                          id={topic.id}
                          title={topic.title}
                          authorName={topic.authorName}
                          authorPicture={topic.authorPicture}
                          createdAt={topic.createdAt}
                          lastMessage={topic.lastMessage}
                          messagesCount={topic.messagesCount}
          />
        ))
      }
    </div>
  );
}

export default ForumTopics;
