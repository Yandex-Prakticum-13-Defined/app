import React, { FC } from 'react';
import './ForumTopic.scss';
import { Link } from 'react-router-dom';
import ForumMessage from '../ForumMessage/ForumMessage';
import { messages } from '../../mockData/mockMessages';
import { ERoutes } from '../../../../utils/constants/routes';

export type TMessage = {
  id: string;
  authorName: string;
  authorPicture: string;
  date: string;
  text: string;
  isResponse: boolean;
};

const ForumTopic: FC = () => {
  const title = 'Здесь будет название темы';

  return (
    <div className='forum-topic'>
      <Link className='forum-topic__backlink' to={ERoutes.FORUM}>На главную</Link>
      <h2 className='forum-topic__title'>{title}</h2>
      {
        messages.map((message) => (
          <ForumMessage
            key={message.id}
            id={message.id}
            authorName={message.authorName}
            authorPicture={message.authorPicture}
            date={message.date}
            text={message.text}
            isResponse={message.isResponse}
          />
        ))
      }
      <form className='forum-topic__form'>
        <textarea className='forum-topic__textarea' placeholder='Введите ваше сообщение'/>
        <button className='forum-topic__button' type='submit'>Добавить сообщение</button>
      </form>
    </div>
  );
};

export default ForumTopic;
