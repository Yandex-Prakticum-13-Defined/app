import React, { FC } from 'react';

import './Form.scss';

import Button, { IButton } from '../../components/Button/Button';

interface IForm {
  title?: string;
  children?: React.ReactNode;
  button?: IButton;
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange?: () => void;
}

const Form:FC<IForm> = ({
  title, children, button, handleSubmit
}) => (
  <form className='form' onSubmit={handleSubmit}>
    <h1 className='form__title'>{title}</h1>
    {children}
    <Button type={button?.type} title={button?.title} disabled={button?.disabled}/>
  </form>
);

export default Form;
