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
  placeholder?: string;
}

// eslint-disable-next-line react/display-name
export const Input = ({
  name,
  control,
  value,
  rules,
  type,
  placeholder
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
      {
        type !== 'file'
          // eslint-disable-next-line react/jsx-props-no-spreading
          ? <input className='input' type={type} placeholder={placeholder} {...field}/>
          : <input className='input' type={type} placeholder={placeholder} onChange={field.onChange} name={field.name}/>
      }
      {errors && <span className='input__error'>{errors[name]?.message}</span>}
    </>
  );
};
