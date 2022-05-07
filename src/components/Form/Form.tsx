import React, { FC, FormEvent, ReactNode } from 'react';
import './Form.scss';
import { Link } from 'react-router-dom';
import Button, { IButton } from '../Button/Button';
import { ERoutes } from '../../App';

interface IForm {
  title: string;
  children: ReactNode;
  button: IButton;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  linkTo: ERoutes;
  linkText: string;
}

const Form: FC<IForm> = ({
  title, children, button, handleSubmit, linkTo, linkText
}) => (
  <form className='form' onSubmit={handleSubmit}>
    <h1 className='form__title'>{title}</h1>
    {children}
    <Button type='submit' title={button.title} disabled={button.disabled}/>
    <Link className='form__link' to={linkTo}>{linkText}</Link>
  </form>
);

export default Form;
