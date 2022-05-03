import React from 'react';

import './Form.scss';

import Button, { IButton } from '../../components/Button/Button';

interface IForm {
  title?: string;
  children?: React.ReactNode;
  button?: IButton;
  handleSubmit?: any;
  onChange?: any;
}

const Form = ({
  title, children, button, handleSubmit
}: IForm) => (
  <form className='form' onSubmit={handleSubmit}>
    <h1 className='form__title'>{title}</h1>
    {children}
    <Button type={button?.type} title={button?.title} disabled={button?.disabled}/>
  </form>
);

export default Form;
