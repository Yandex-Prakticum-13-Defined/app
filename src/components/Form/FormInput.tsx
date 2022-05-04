import React, { memo } from 'react';
import './Form.scss';
import { useController } from 'react-hook-form';

interface IFormInput {
  control?: any;
  defaultValue?: string;
  name: string;
  rules?: any;
  type: string;
  placeholder: string;
  className?: string;
  onChange?: (e: any) => void;
  value?: string;
}

export const FormInput = memo(({
  control,
  defaultValue,
  name,
  rules,
  ...rest
}: IFormInput) => {
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
