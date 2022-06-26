import React, {
  FC, FormEvent, useEffect, useRef, useState
} from 'react';
import './TopicList.scss';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { createTopic, getAllTopics } from '../../../../store/slice/forumSlice';
import { EStatus } from '../../../../store/interface';
import Topic from '../Topic/Topic';

const TopicList: FC = () => {
  const dispatch = useAppDispatch();
  const topics = useAppSelector((state) => state.forum.topics.data);
  const isLoading = useAppSelector((state) => state.forum.topics.status === EStatus.PENDING);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userId = useAppSelector((state) => state.user.data!.id);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isEmptyFields, setIsEmptyFields] = useState(false);
  const refTitle = useRef<HTMLInputElement>(null);
  const refMessage = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    dispatch(getAllTopics());
  }, []);

  const handleCreateTopic = async (e: FormEvent) => {
    e.preventDefault();
    if (message && title) {
      await dispatch(createTopic({ userId, title, message }));
      await dispatch(getAllTopics());
      setIsEmptyFields(false);
      setTitle('');
      setMessage('');
    } else {
      setIsEmptyFields(true);
      if (!title) {
        refTitle.current && refTitle.current.focus();
      } else {
        refMessage.current && refMessage.current.focus();
      }
    }
  };

  return (
    isLoading ? (
      <>
        Загрузка...
      </>
    ) : (
      <div className='topic-list'>
        <form className='topic-list__form' onSubmit={handleCreateTopic}>
          <input
            className='topic-list__input'
            type='text'
            placeholder='Введите название темы'
            ref={refTitle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className='topic-list__textarea'
            placeholder='Введите ваше сообщение'
            ref={refMessage}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className='topic-list__button' type='submit'>Создать новую тему</button>
        </form>
        {isEmptyFields && (
          <p className='topic-list__error-message'>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Поля "Название темы" и "Сообщение" обязательны к заполнению!
          </p>
        )}
        {
        topics.map((topic) => (
          <Topic
            key={topic.id}
            id={topic.id}
            title={topic.title}
            authorName={topic.authorName}
            authorPicture={topic.authorPicture}
            createdAt={topic.createdAt}
            message={topic.message}
            messagesCount={topic.messagesCount}
          />
        ))
      }
      </div>
    )
  );
};

export default TopicList;
