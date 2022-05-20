import React, { FC, useEffect } from 'react';
import './Start.scss';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../hook/useAppDispatch';
import { useAppSelector } from '../../hook/useAppSelector';
import { ERoutes } from '../../utils/constants/routes';
import { clearFirstLoading } from '../../store/reducer/helper';

interface ILink {
  route: ERoutes;
  isAuthRoute?: boolean;
  text: string;
}

const Start: FC = () => {
  const isAuthenticated = useAppSelector((state) => state.user.data !== null);
  const dispatch = useAppDispatch();
  const firstLoading = useAppSelector((state) => state.helper.firstLoading);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(clearFirstLoading());
    }
  }, []);

  const links: ILink[] = [
    { route: ERoutes.GAME, text: 'Начать игру' },
    { route: ERoutes.PROFILE, text: 'Профиль' },
    { route: ERoutes.LEADERBOARD, text: 'Таблица лидеров' },
    { route: ERoutes.FORUM, text: 'Форум' },
    { route: ERoutes.LOGOUT, text: 'Выйти' },
    { route: ERoutes.LOGIN, text: 'Войти', isAuthRoute: true },
    { route: ERoutes.REGISTER, text: 'Зарегистрироваться', isAuthRoute: true }
  ];

  const h1Variants = {
    hidden: { opacity: 0, x: -1000 },
    visible: { opacity: 1, x: 0 }
  };

  const pVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const linkVariants = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.4 }
    }),
    hidden: { opacity: 0, y: 100 }
  };

  const renderLink = (link: ILink, i: number) => (
    <motion.div
      key={link.text}
      variants={linkVariants}
      initial={firstLoading ? 'hidden' : 'visible'}
      animate='visible'
      custom={i}
    >
      <Link className='start__link' to={link.route}>
        {link.text}
      </Link>
    </motion.div>
  );

  return (
    <section className='start'>
      <div className='start__links'>
        {
          links.filter((route) => isAuthenticated === !route.isAuthRoute).map((link, i) => (renderLink(link, i)))
        }
      </div>
      <div className='text-container'>
        <motion.h1
          variants={h1Variants}
          initial={firstLoading ? 'hidden' : 'visible'}
          animate='visible'
          className='start__title'
        >
          Арканоид
        </motion.h1>
        <motion.p
          variants={pVariants}
          initial={firstLoading ? 'hidden' : 'visible'}
          animate='visible'
          transition={{ duration: 2 }}
          className='start__text'
        >
          В нижней части экрана находится ракетка,
          которая перемещается горизонтально с помощью мыши или стрелок клавиатуры.
          В верхней части экрана расположены блоки,
          которые разрушаются при попадании в них мячика.
          Если трижды не удалось отбить мячик ракеткой, то игра заканчивается.
        </motion.p>
      </div>
    </section>
  );
};

export default Start;
