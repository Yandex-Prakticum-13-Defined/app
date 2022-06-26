import React, { FC } from 'react';
import './Topic.scss';
import { Link } from 'react-router-dom';
import { ITopic } from '../../../../API/forumAPI';
import { baseURL } from '../../../../API/API';
import mockProfilePicture from '../../../../images/mock-profile-picture.jpg';

const Topic: FC<ITopic> = (props) => (
  <Link className='topic' to={String(props.id)}>
    <div className='topic__author-picture-wrapper'>
      <img
        className='topic__author-picture'
        src={props.authorPicture ? `${baseURL}/resources${props.authorPicture}` : mockProfilePicture}
        alt='Аватар пользователя'
      />
    </div>
    <div className='topic__text-wrapper'>
      <p className='topic__title'>{props.title}</p>
      <p className='topic__creation'>
        Пользователь
        <span className='topic__author-name'>
          {props.authorName}
        </span>
        создал
        <span className='topic__date'>
          {props.createdAt}
        </span>
      </p>
      <p className='topic__message-wrapper'>
        <span className='topic__message'>{props.message}</span>
      </p>
    </div>
    <div className='topic__messages-count-wrapper'>
      <p className='topic__messages-text'>Всего сообщений:</p>
      <p className='topic__messages-count'>{props.messagesCount}</p>
    </div>
  </Link>
);

export default Topic;
