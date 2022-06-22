import React, { FC, useEffect } from 'react';
import './ForumTopics.scss';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { getAllTopics } from '../../../../store/slice/forumSlice';
import ForumTopicCard from '../ForumTopicCard/ForumTopicCard';

const ForumTopics: FC = () => {
  const dispatch = useAppDispatch();
  const topics = useAppSelector((state) => state.forum.topics.data);

  useEffect(() => {
    dispatch(getAllTopics());
  }, []);

  return (
    <div className='forum-topics'>
      <form className='forum-topics__form'>
        <input className='forum-topics__input' type='text' placeholder='Введите название темы'/>
        <textarea className='forum-topics__textarea' placeholder='Введите ваше сообщение'/>
        <button className='forum-topics__button' type='submit'>Создать новую тему</button>
      </form>
      {
        topics.map((topic) => (
          <ForumTopicCard
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
  );
};

export default ForumTopics;
