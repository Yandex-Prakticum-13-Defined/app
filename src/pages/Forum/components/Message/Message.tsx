import React, {
  ChangeEvent, FC, useRef, useState
} from 'react';
import './Message.scss';
import { baseURL } from '../../../../API/API';
import mockProfilePicture from '../../../../images/mock-profile-picture.jpg';
import { IMessage } from '../../../../API/forumAPI';
import { IDBMessage } from '../../../../db/models/message';

interface IMessageProps extends IMessage {
  onReplyMessage: (message: Omit<IDBMessage, 'topicId' | 'userId'>) => void;
}

enum EButtonText {
  'REPLY' = 'Ответить',
  'HIDE' = 'Скрыть',
  'SEND' = 'Отправить'
}

const Message: FC<IMessageProps> = (props) => {
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [buttonText, setButtonText] = useState(EButtonText.REPLY);
  const refMessage = useRef<HTMLTextAreaElement>(null);

  const handlerSendMessage = () => {
    if (isTextAreaVisible) {
      if (message) {
        props.onReplyMessage({
          text: message,
          responseTo: props.id
        });
        setMessage('');
      }
      setButtonText(EButtonText.REPLY);
    } else {
      setButtonText(message ? EButtonText.SEND : EButtonText.HIDE);
      setTimeout(() => refMessage.current && refMessage.current.focus(), 200);
    }
    setIsTextAreaVisible(!isTextAreaVisible);
  };

  const handlerChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (isTextAreaVisible) {
      setButtonText(e.target.value ? EButtonText.SEND : EButtonText.HIDE);
    } else {
      setButtonText(EButtonText.REPLY);
    }
  };

  return (
    <div className='forum-message' style={{ marginLeft: `${props.offsetLevel * 40}px` }}>
      <div className='forum-message__author-wrapper'>
        <p className='forum-message__author-name'>{props.authorName}</p>
        <img
          className='forum-message__author-picture'
          src={props.authorPicture ? `${baseURL}/resources${props.authorPicture}` : mockProfilePicture}
          alt='Аватар пользователя'
        />
      </div>
      <div className='forum-message__text-wrapper'>
        <div className='forum-message__info'>
          <p className='forum-message__date'>{props.date}</p>
          {props.id !== -1 && (
            <p className='forum-message__id'>
              #
              {props.id}
            </p>
          )}
        </div>
        <p className='forum-message__text'>{props.text}</p>
        <form className={isTextAreaVisible
          ? 'forum-message__form forum-message__form_space-between'
          : 'forum-message__form forum-message__form_align-right'}
        >
          {isTextAreaVisible && (
            <textarea
              className='forum-message__textarea'
              placeholder='Введите ваше сообщение'
              onChange={handlerChangeText}
              ref={refMessage}
              value={message}
            />
          )}
          <button
            type='button'
            className='forum-message__button'
            onClick={handlerSendMessage}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
