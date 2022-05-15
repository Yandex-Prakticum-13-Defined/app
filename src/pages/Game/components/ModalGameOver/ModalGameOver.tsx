import { Link } from 'react-router-dom';
import React from 'react';
import './ModalGameOver.scss';
import { ERoutes } from '../../../../utils/constants/routes';

interface IModalGameOver {
  hideModal: () => void;
  isRoundWin: boolean;
}
const ModalGameOver: React.FC<IModalGameOver> = ({ hideModal, isRoundWin }) => {
  const textRetry = isRoundWin ? 'Продолжить' : 'Повторить';
  const textTitle = isRoundWin ? 'Поздравляем!' : 'Игра окончена';

  return (
    <div className='modal'>
      <h2 className='modal__title'>{textTitle}</h2>
      <Link className='modal__link' to={ERoutes.START}>На главную</Link>
      <Link className='modal__link' to={ERoutes.LEADERBOARD}>Таблица лидеров</Link>
      <Link onClick={hideModal} className='modal__link' to={ERoutes.GAME}>{textRetry}</Link>
    </div>
  );
};

export default ModalGameOver;
