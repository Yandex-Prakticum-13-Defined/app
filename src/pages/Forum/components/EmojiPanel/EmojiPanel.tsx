import React, { FC, MouseEvent } from 'react';
import './EmojiPanel.scss';

export interface IEmojiPanelProps {
  clickHandler: (event: MouseEvent<HTMLButtonElement>) => void;
  emojiArray: string[];
}

const EmojiPanel: FC<IEmojiPanelProps> = ({ clickHandler, emojiArray }) => (
  <div className='emoji-panel'>
    {
      emojiArray.map((emoji) => (
        <button key={emoji} className='emoji-panel__emoji-button' type='button' onClick={clickHandler}>
          {emoji}
        </button>
      ))
    }
  </div>
);

export default EmojiPanel;
