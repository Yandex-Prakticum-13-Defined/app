import React, { FC } from 'react';
import './Leaderboard.scss';
import { Link } from 'react-router-dom';
import { ERoutes } from '../../utils/constants/routes';
import LeaderboardTable from './components/LeaderboardTable/LeaderboardTable';

const Leaderboard: FC = () => (
  <section className='leaderboard'>
    <h1 className='leaderboard__title'>Таблица лидеров</h1>
    <Link className='leaderboard__backlink' to={ERoutes.START}>На главную</Link>
    <LeaderboardTable/>
  </section>
);

export default Leaderboard;
