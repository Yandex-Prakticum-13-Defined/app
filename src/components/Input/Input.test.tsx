import React, { FC } from 'react';
import renderer from 'react-test-renderer';
import { useForm } from 'react-hook-form';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VALIDATION } from '../../utils/constants/validation';
import { Input } from './Input';

const TestInputWrapper: FC = () => {
  const { control } = useForm({ mode: 'onChange' });

  return (
    <Input
      name='test'
      control={control}
      value='Значение по умолчанию'
      rules={{
        required: VALIDATION.required,
        minLength: VALIDATION.minLength_3,
        maxLength: VALIDATION.maxLength_20,
        pattern: VALIDATION.login
      }}
      type='text'
      placeholder='Введите значение'
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
    render(<TestInputWrapper/>);
    expect(screen.getByDisplayValue('Значение по умолчанию')).toBeInTheDocument();
  });

  it('передаётся placeholder', () => {
    render(<TestInputWrapper/>);
    expect(screen.getByPlaceholderText('Введите значение')).toBeInTheDocument();
  });

  it('валидируется required', async () => {
    render(<TestInputWrapper/>);
    const user = userEvent.setup();
    await act(async () => {
      await user.clear(screen.getByPlaceholderText('Введите значение'));
    });
    expect(screen.getByText(VALIDATION.required)).toBeInTheDocument();
  });

  it('валидируется minLength', async () => {
    render(<TestInputWrapper/>);
    const user = userEvent.setup();
    await act(async () => {
      await user.clear(screen.getByPlaceholderText('Введите значение'));
    });
    await act(async () => {
      await user.type(screen.getByPlaceholderText('Введите значение'), '1');
    });
    expect(screen.getByText(VALIDATION.minLength_3.message)).toBeInTheDocument();
  });

  it('валидируется maxLength', async () => {
    render(<TestInputWrapper/>);
    const user = userEvent.setup();
    await act(async () => {
      await user.clear(screen.getByPlaceholderText('Введите значение'));
    });
    await act(async () => {
      await user.type(screen.getByPlaceholderText('Введите значение'), 'Здесь явно больше 20 символов');
    });
    expect(screen.getByText(VALIDATION.maxLength_20.message)).toBeInTheDocument();
  });

  it('валидируется pattern', async () => {
    render(<TestInputWrapper/>);
    const user = userEvent.setup();
    await act(async () => {
      await user.clear(screen.getByPlaceholderText('Введите значение'));
    });
    await act(async () => {
      await user.type(screen.getByPlaceholderText('Введите значение'), '12345');
    });
    expect(screen.getByText(VALIDATION.login.message)).toBeInTheDocument();
  });
});
