import React, { FC, FormEvent } from 'react';
import renderer from 'react-test-renderer';
import { useForm } from 'react-hook-form';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VALIDATION } from '../../utils/constants/validation';
import { Input } from '../Input/Input';
import { ERoutes } from '../../utils/constants/routes';
import Form from './Form';

type TTestFormWrapperProps = {
  formTitle?: string;
  buttonText?: string;
  handleSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  linkTo?: ERoutes;
  linkText?: string;
  inputName?: string;
  inputType?: string;
  inputPlaceholder?: string;
  rules?: Record<string, unknown>;
};

const TestFormWrapper: FC<TTestFormWrapperProps> = ({
  formTitle = 'Заголовок',
  buttonText = 'Кнопка',
  handleSubmit = (event) => event.preventDefault(),
  linkTo = ERoutes.REGISTER,
  linkText = 'Ссылка',
  inputName = 'login',
  inputType = 'text',
  inputPlaceholder = 'Логин',
  rules = {
    required: VALIDATION.required
  }
}) => {
  const {
    formState: {
      isValid
    },
    control
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      login: ''
    }
  });

  return (
    <BrowserRouter>
      <Form
        title={formTitle}
        button={{
          type: 'submit',
          title: buttonText,
          disabled: !isValid
        }}
        handleSubmit={handleSubmit}
        linkTo={linkTo}
        linkText={linkText}
      >
        <Input
          name={inputName}
          type={inputType}
          placeholder={inputPlaceholder}
          control={control}
          rules={rules}
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
    render(<TestFormWrapper formTitle='Тестовый заголовок'/>);
    expect(screen.getByText('Тестовый заголовок')).toBeInTheDocument();
  });

  it('содержит дочерние инпуты', () => {
    render(<TestFormWrapper inputPlaceholder='Логин'/>);
    expect(screen.getByPlaceholderText('Логин')).toBeInTheDocument();
  });

  it('содержит кнопку', () => {
    render(<TestFormWrapper buttonText='Тестовая кнопка'/>);
    expect(screen.getByText('Тестовая кнопка')).toBeInTheDocument();
  });

  it('кнопка заблокирована при невалидных значениях', () => {
    render(
      <TestFormWrapper
        buttonText='Тестовая кнопка'
        inputName='login'
        inputType='text'
        inputPlaceholder='Логин'
        rules={{
          required: VALIDATION.required
        }}
      />
    );
    expect(screen.getByText('Тестовая кнопка')).toBeDisabled();
  });

  it('кнопка активна при валидных значениях', async () => {
    render(
      <TestFormWrapper
        buttonText='Тестовая кнопка'
        inputName='login'
        inputType='text'
        inputPlaceholder='Логин'
        rules={{
          required: VALIDATION.required
        }}
      />
    );
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Логин'), 'TestLogin');
    expect(screen.getByText('Тестовая кнопка')).toBeEnabled();
  });

  it('функция onSubmit вызывается при валидных значениях', async () => {
    const handleSubmit = jest.fn((event) => event.preventDefault());
    render(
      <TestFormWrapper
        buttonText='Тестовая кнопка'
        handleSubmit={handleSubmit}
        inputName='login'
        inputType='text'
        inputPlaceholder='Логин'
        rules={{
          required: VALIDATION.required
        }}
      />
    );
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Логин'), 'TestLogin');
    await user.click(screen.getByText('Тестовая кнопка'));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('присутствует ссылка', () => {
    render(<TestFormWrapper linkTo={ERoutes.REGISTER} linkText='Тестовая ссылка'/>);
    expect(screen.getByText('Тестовая ссылка')).toBeInTheDocument();
  });
});
