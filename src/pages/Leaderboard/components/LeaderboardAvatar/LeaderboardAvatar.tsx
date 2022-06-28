import React, { useEffect, useRef, useState } from 'react';
import { useOnScreen } from '../../../../hooks/useOnScreen';
import './LeaderboardAvatar.scss';

interface ILeaderboardAvatarProps {
  avatar: string;
}

const LeaderboardAvatar: React.FC<ILeaderboardAvatarProps> = ({ avatar }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInVisibleArea = useOnScreen(ref);
  const [isHandlersAdded, setIsHandlersAdded] = useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    if (isInVisibleArea && !isHandlersAdded) {
      setIsHandlersAdded(true);
    }
  }, [isInVisibleArea, isHandlersAdded]);

  return (
    <div
      className={`leaderboard-avatar ${isLoaded ? '' : 'leaderboard-avatar__preload-container'}`}
      ref={ref}
    >
      {isHandlersAdded && (
        <img
          style={{ display: isLoaded ? 'block' : 'none' }}
          className={`${isLoaded ? 'leaderboard-avatar__image_visible' : 'leaderboard-avatar__image_hidden'}`}
          src={avatar}
          alt='Аватар пользователя'
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

export default LeaderboardAvatar;
