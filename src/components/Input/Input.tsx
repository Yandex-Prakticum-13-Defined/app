import React from 'react';
import './Input.scss';
import { useController } from 'react-hook-form';

export interface IInput {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  value?: string;
  rules?: Record<string, unknown>;
  type: string;
  placeholder: string;
}

// eslint-disable-next-line react/display-name
export const Input = ({
  name,
  control,
  value,
  rules,
  ...rest
}: IInput) => {
  const {
    field,
    formState: { errors }
  } = useController({
    name,
    control,
    defaultValue: value ?? '',
    rules
  });

  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input className='input' {...field} {...rest}/>
      {errors && <span className='input__error'>{errors[name]?.message}</span>}
    </>
  );
};
