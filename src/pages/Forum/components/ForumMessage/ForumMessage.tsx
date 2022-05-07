import React, { FC } from 'react';
import './ForumMessage.scss';
import { TMessage } from '../ForumTopic/ForumTopic';

const ForumMessage: FC<TMessage> = (props) => (
  <div className={props.isResponse ? 'forum-message forum-message_type_response' : 'forum-message'}>
    <div className='forum-message__author-wrapper'>
      <p className='forum-message__author-name'>{props.authorName}</p>
      <img className='forum-message__author-picture' src='https://tinyurl.com/bdznfmzs' alt='Аватар пользователя'/>
    </div>
    <div className='forum-message__text-wrapper'>
      <div className='forum-message__info'>
        <p className='forum-message__date'>{props.date}</p>
        <p className='forum-message__id'>
          #
          {props.id}
        </p>
      </div>
      <p className='forum-message__text'>{props.text}</p>
    </div>
  </div>
);

export default ForumMessage;
