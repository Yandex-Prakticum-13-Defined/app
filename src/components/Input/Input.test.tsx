import React, { FC } from 'react';
import renderer from 'react-test-renderer';
import { useForm } from 'react-hook-form';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VALIDATION } from '../../utils/constants/validation';
import { Input } from './Input';

type TTestInputWrapperProps = {
  name?: string;
  value?: string;
  rules?: Record<string, unknown>;
  type?: string;
  placeholder?: string;
};

const TestInputWrapper: FC<TTestInputWrapperProps> = ({
  name = 'test',
  value = 'Значение по умолчанию',
  rules = {
    required: VALIDATION.required
  },
  type = 'text',
  placeholder = 'Введите значение'
}) => {
  const { control } = useForm({ mode: 'onChange' });

  return (
    <Input
      name={name}
      control={control}
      value={value}
      rules={rules}
      type={type}
      placeholder={placeholder}
    />
  );
};

describe('Тестируем Input.tsx', () => {
  it('проверяем снимок', () => {
    const inputComponent = renderer.create(
      <TestInputWrapper/>
    ).toJSON();
    expect(inputComponent).toMatchSnapshot();
  });

  it('передаётся value', () => {
    render(<TestInputWrapper value='Тестовое значение'/>);
    expect(screen.getByDisplayValue('Тестовое значение')).toBeInTheDocument();
  });

  it('передаётся placeholder', () => {
    render(<TestInputWrapper placeholder='Введите значение'/>);
    expect(screen.getByPlaceholderText('Введите значение')).toBeInTheDocument();
  });

  it('валидируется required', async () => {
    render(
      <TestInputWrapper
        rules={{ required: VALIDATION.required }}
        placeholder='Введите значение'
      />
    );
    const user = userEvent.setup();
    await act(async () => {
      await user.clear(screen.getByPlaceholderText('Введите значение'));
    });
    expect(screen.getByText(VALIDATION.required)).toBeInTheDocument();
  });
});
