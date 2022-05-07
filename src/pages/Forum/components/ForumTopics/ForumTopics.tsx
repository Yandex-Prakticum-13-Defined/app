import React, { FC } from 'react';
import './ForumTopics.scss';
import ForumTopic from '../ForumTopicCard/ForumTopicCard';
import { topics } from '../../mockData/mockTopics';

export type TTopic = {
  id: string;
  title: string;
  authorName: string;
  authorPicture: string;
  createdAt: string;
  lastMessage: string;
  messagesCount: number;
};

const ForumTopics: FC = () => (
  <div className='forum-topics'>
    <form className='forum-topics__form'>
      <input className='forum-topics__input' type='text' placeholder='Введите название темы'/>
      <textarea className='forum-topics__textarea' placeholder='Введите ваше сообщение'/>
      <button className='forum-topics__button' type='submit'>Создать новую тему</button>
    </form>
    {
        topics.map((topic) => (
          <ForumTopic
            key={topic.id}
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

export default ForumTopics;
