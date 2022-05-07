import React, { memo } from 'react';
import './FormInput.scss';
import { useController } from 'react-hook-form';

interface IFormInput {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: any;
  defaultValue?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: any;
  type: string;
  placeholder: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (e: any) => void;
  value?: string;
}

// eslint-disable-next-line react/display-name
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
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input {...field} {...rest}/>
      {errors && <span className='form-input__error'>{errors[name]?.message}</span>}
    </>
  );
});
