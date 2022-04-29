import React from 'react';

import './Form.scss';

import Button from '../../components/Button/Button';

interface IProfile {
  title?: string;
  children?: any;
  button?: any;
  handleSubmit?: any;
}

const Profile = ({
  title, children, button, handleSubmit
}: IProfile) => (
      <form className='form' onSubmit={handleSubmit}>
        <h1 className='form__title'>{title}</h1>
        {children}
        <Button type={button?.type} title={button?.title} disabled={button?.disabled}/>
      </form>
);

export default Profile;
