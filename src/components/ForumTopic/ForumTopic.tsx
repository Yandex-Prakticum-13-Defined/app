import React from 'react';
import './ForumTopic.scss';
import { Link } from 'react-router-dom';
import ForumMessage from '../ForumMessage/ForumMessage';

export type TMessage = {
  id: string;
  authorName: string;
  authorPicture: string;
  date: string;
  text: string;
  responses: Omit<TMessage, 'responses'>[];
};

export type TTransformedMessage = {
  id: string;
  authorName: string;
  authorPicture: string;
  date: string;
  text: string;
  isResponse: boolean;
};

function ForumTopic() {
  const title = 'Здесь будет название темы';
  const messages: TMessage[] = [
    {
      id: '1',
      authorName: 'Автор1',
      authorPicture: 'https://tinyurl.com/bdznfmzs',
      date: '2022-05-01 10:57',
      text: 'Всем привет!',
      responses: [
        {
          id: '3',
          authorName: 'Автор3',
          authorPicture: 'https://tinyurl.com/bdznfmzs',
          date: '2022-05-02 10:27',
          text: 'Пример дерева комментариев'
        },
        {
          id: '4',
          authorName: 'Автор4',
          authorPicture: 'https://tinyurl.com/bdznfmzs',
          date: '2022-05-02 11:11',
          text: 'Ещё комментарий'
        }
      ]
    },
    {
      id: '2',
      authorName: 'Автор2',
      authorPicture: 'https://tinyurl.com/bdznfmzs',
      date: '2022-05-01 11:29',
      text: 'И тебе привет!',
      responses: []
    }
  ];

  return (
    <div className='forum-topic'>
      <Link className='forum-topic__backlink' to='/forum'>На главную</Link>
      <h2 className='forum-topic__title'>{title}</h2>
      {
        transformMessagesForRender(messages).map((message) => (
          <ForumMessage key={message.id}
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
        <button className='forum-topic__button' type='submit'>Добавить сообщение</button>
        <textarea className='forum-topic__textarea' placeholder='Введите ваше сообщение'/>
      </form>
    </div>
  );
}

function transformMessagesForRender(initialMessages: TMessage[]): TTransformedMessage[] {
  const transformedMessages: TTransformedMessage[] = [];

  initialMessages.forEach((message) => {
    const transformedMessage = (({ responses, ...o }) => ({ ...o, isResponse: false }))(message);
    transformedMessages.push(transformedMessage);

    message.responses.forEach((response) => transformedMessages.push({ ...response, isResponse: true }));
  });

  return transformedMessages;
}

export default ForumTopic;
