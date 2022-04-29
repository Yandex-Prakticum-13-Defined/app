import React, { memo } from 'react';
import './Form.scss';
import { useController } from 'react-hook-form';

interface IInput {
  control?: any;
  defaultValue?: string;
  name: string;
  rules?: any;
  type: string;
  placeholder: string;
  className?: string;
}

export const FormInput = memo(({
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
      <input {...field} {...rest} />
      {errors && <span className='input__error'>{errors[name]?.message}</span>}
    </>
  );
});
