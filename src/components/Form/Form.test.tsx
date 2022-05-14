import React, { FC } from 'react';
import renderer from 'react-test-renderer';
import { useForm } from 'react-hook-form';
import { BrowserRouter } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VALIDATION } from '../../utils/constants/validation';
import { Input } from '../Input/Input';
import { ERoutes } from '../../utils/constants/routes';
import Form from './Form';

const handleSubmit = jest.fn((event) => event.preventDefault());

const TestFormWrapper: FC = () => {
  const {
    formState: {
      isValid
    },
    control
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      login: '',
      password: ''
    }
  });

  return (
    <BrowserRouter>
      <Form
        title='Заголовок'
        button={{
          type: 'submit',
          title: 'Кнопка',
          disabled: !isValid
        }}
        handleSubmit={handleSubmit}
        linkTo={ERoutes.REGISTER}
        linkText='Ссылка'
      >
        <Input
          name='login'
          type='text'
          placeholder='Логин'
          control={control}
          rules={{
            required: VALIDATION.required,
            minLength: VALIDATION.minLength_3,
            maxLength: VALIDATION.maxLength_20,
            pattern: VALIDATION.login
          }}
        />
        <Input
          name='password'
          type='password'
          placeholder='Пароль'
          control={control}
          rules={{
            required: VALIDATION.required,
            pattern: VALIDATION.password,
            minLength: VALIDATION.minLength_8
          }}
        />
      </Form>
    </BrowserRouter>
  );
};

describe('Тестируем Form.tsx', () => {
  it('проверяем снимок', () => {
    const inputComponent = renderer.create(
      <TestFormWrapper/>
    ).toJSON();
    expect(inputComponent).toMatchSnapshot();
  });

  it('содержит заголовок', () => {
    render(<TestFormWrapper/>);
    expect(screen.getByText('Заголовок')).toBeInTheDocument();
  });

  it('содержит дочерние инпуты', () => {
    render(<TestFormWrapper/>);
    expect(screen.getByPlaceholderText('Логин')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();
  });

  it('содержит кнопку', () => {
    render(<TestFormWrapper/>);
    expect(screen.getByText('Кнопка')).toBeInTheDocument();
  });

  it('кнопка заблокирована при невалидных значениях', () => {
    render(<TestFormWrapper/>);
    expect(screen.getByText('Кнопка')).toBeDisabled();
  });

  it('кнопка активна при валидных значениях', async () => {
    render(<TestFormWrapper/>);
    const user = userEvent.setup();
    await act(async () => {
      await user.type(screen.getByPlaceholderText('Логин'), 'TestLogin');
    });
    await act(async () => {
      await user.type(screen.getByPlaceholderText('Пароль'), 'TestPassword1');
    });
    expect(screen.getByText('Кнопка')).toBeEnabled();
  });

  it('функция onSubmit вызывается при валидных значениях', async () => {
    render(<TestFormWrapper/>);
    const user = userEvent.setup();
    await act(async () => {
      await user.type(screen.getByPlaceholderText('Логин'), 'TestLogin');
    });
    await act(async () => {
      await user.type(screen.getByPlaceholderText('Пароль'), 'TestPassword1');
    });
    await act(async () => {
      await user.click(screen.getByText('Кнопка'));
    });
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('присутствует ссылка', () => {
    render(<TestFormWrapper/>);
    expect(screen.getByText('Ссылка')).toBeInTheDocument();
  });
});
