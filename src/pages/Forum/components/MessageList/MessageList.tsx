import React, {
  ChangeEvent,
  FC, FormEvent, useEffect, useState
} from 'react';
import './MessageList.scss';
import { Link, useParams } from 'react-router-dom';
import { ERoutes } from '../../../../utils/constants/routes';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { createMessage, getMessagesByTopicId } from '../../../../store/slice/forumSlice';
import Message from '../Message/Message';
import { IDBMessage } from '../../../../db/models/message';

const MessageList: FC = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.forum.messages.data);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userId = useAppSelector((state) => state.user.data!.id);
  const topicTitle = (messages.length > 0 && messages[0].topicTitle) || '';
  const [newMessage, setNewMessage] = useState('');
  const [isMessageEmpty, setIsMessageEmpty] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatch(getMessagesByTopicId(+id!));
  }, []);

  const handlerReplyMessage = async (message: Omit<IDBMessage, 'topicId' | 'userId'>) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await dispatch(createMessage({ ...message, topicId: +id!, userId }));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await dispatch(getMessagesByTopicId(+id!));
  };

  const handlerAddMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage) {
      setIsMessageEmpty(true);

      return;
    }

    await dispatch(createMessage({
      userId,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      topicId: +id!,
      responseTo: 0,
      text: newMessage
    }));
    setNewMessage('');
    setIsMessageEmpty(false);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await dispatch(getMessagesByTopicId(+id!));
  };

  const handlerChangeNewMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className='message-list'>
      <Link className='message-list__backlink' to={ERoutes.FORUM}>Список тем</Link>
      <h2 className='message-list__title'>{topicTitle}</h2>
      {
        messages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            authorName={message.authorName}
            authorPicture={message.authorPicture}
            date={message.date}
            text={message.text}
            offsetLevel={message.offsetLevel}
            onReplyMessage={handlerReplyMessage}
          />
        ))
      }
      <form className='message-list__form'>
        <textarea
          className='message-list__textarea'
          placeholder='Введите ваше сообщение'
          onChange={handlerChangeNewMessage}
          value={newMessage}
        />
        <button
          className='message-list__button'
          type='submit'
          onClick={handlerAddMessage}
        >
          Добавить сообщение
        </button>
      </form>
      {isMessageEmpty && (
        <p className='message-list__error-message'>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Поле "Сообщение" не должно быть пустым!
        </p>
      )}
    </div>
  );
};

export default MessageList;
