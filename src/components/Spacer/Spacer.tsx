import React, { FC } from 'react';
import './Spacer.scss';

interface ISpacer {
  className: string;
}

const Spacer: FC<ISpacer> = ({ className }) => (
  <div className={className} />
);

export default Spacer;
