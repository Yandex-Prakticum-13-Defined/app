import React, { memo } from 'react';
import './Input.scss';
import { useController } from 'react-hook-form';

export interface IInput {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  defaultValue?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: any;
  type: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (e: any) => void;
  value?: string;
}

// eslint-disable-next-line react/display-name
export const Input = memo(({
  control,
  defaultValue,
  name,
  rules,
  ...rest
}: IInput) => {
  const {
    field,
    formState: { errors }
  } = useController({
    name,
    control,
    rules,
    defaultValue: defaultValue ?? ''
  });

  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input className='input' {...field} {...rest}/>
      {errors && <span className='input__error'>{errors[name]?.message}</span>}
    </>
  );
});
