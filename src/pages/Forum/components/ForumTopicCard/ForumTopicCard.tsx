import React, { FC } from 'react';
import './ForumTopicCard.scss';
import { Link } from 'react-router-dom';
import { TTopic } from '../ForumTopics/ForumTopics';

const ForumTopicCard: FC<TTopic> = (props) => (
  <Link className='forum-topic-card' to={props.id}>
    <div className='forum-topic-card__author-picture-wrapper'>
      <img className='forum-topic-card__author-picture' src={props.authorPicture} alt='Аватар пользователя'/>
    </div>
    <div className='forum-topic-card__text-wrapper'>
      <p className='forum-topic-card__title'>{props.title}</p>
      <p className='forum-topic-card__creation'>
        Пользователь
        <span className='forum-topic-card__author-name'>
          {' '}
          {props.authorName}
          {' '}
        </span>
        создал
        <span className='forum-topic-card__date'>
          {' '}
          {props.createdAt}
        </span>
      </p>
      <p className='forum-topic-card__last-message-wrapper'>
        Последнее сообщение:
        {' '}
        <span className='forum-topic-card__last-message'>{props.lastMessage}</span>
      </p>
    </div>
    <div className='forum-topic-card__messages-count-wrapper'>
      <p className='forum-topic-card__messages-text'>Всего&nbsp;сообщений:</p>
      <p className='forum-topic-card__messages-count'>{props.messagesCount}</p>
    </div>
  </Link>
);

export default ForumTopicCard;
