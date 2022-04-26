import React from 'react';
import './Leaderboard.scss';
import LeaderboardTable from '../../components/LeaderboardTable/LeaderboardTable';

function Leaderboard() {
  return (
    <section className='leaderboard'>
      <h1 className='leaderboard__title'>Таблица лидеров</h1>
      <LeaderboardTable />
    </section>
  );
}

export default Leaderboard;
