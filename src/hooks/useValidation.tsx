import { useEffect, useState } from 'react';

export const useValidation = (value: string, validations: any) => {
  const [isEmpty, setIsEmpty] = useState({ isError: true, error: '' });
  const [usernameError, setUsernameError] = useState({ isError: false, error: '' });
  const [loginError, setLoginError] = useState({ isError: false, error: '' });
  const [emailError, setEmailError] = useState({ isError: false, error: '' });
  const [passwordError, setPasswordError] = useState({ isError: false, error: '' });
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const validation in validations) {
      // eslint-disable-next-line default-case
      switch (validation) {
        case 'isEmpty':
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          value
            ? setIsEmpty({ isError: false, error: '' })
            : setIsEmpty({ isError: true, error: 'Поле не может быть пустым' });
          break;
        case 'username':
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          (/^[А-ЯЁA-Z][a-zа-яё-]{1,29}$/.test(String(value)))
            ? setUsernameError({ isError: false, error: '' })
            : setUsernameError({
              isError: true,
              error: 'Имя должно начинаться с заглавной буквы'
            });
          break;
        case 'login':
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          (/^[А-ЯЁA-Z][a-zа-яё-]{1,29}$/.test(String(value)))
            ? setLoginError({ isError: false, error: '' })
            : setLoginError({
              isError: true,
              error: 'Логин должен начинаться с заглавной буквы'
            });
          break;
        case 'email':
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          (/^[A-Za-z0-9,.-]{1,}[@]([A-Za-z0-9,.-]{1,}[.][A-Za-z]{1,}){1,2}$/
            .test(String(value).toLowerCase()))
            ? setEmailError({ isError: false, error: '' })
            : setEmailError({
              isError: true,
              error: 'Введите корректный адрес электронной почты'
            });
          break;
        case 'password':
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          (/^(?=.*?[A-ZА-ЯЁ])(?=.*?[0-9]).{8,40}$/.test(String(value)))
            ? setPasswordError({ isError: false, error: '' })
            : setPasswordError({
              isError: true,
              error: 'Введите пароль от 8 до 40 символов. Обязательно наличие заглавной буквы и цифры'
            });
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty.isError
      || usernameError.isError
      || loginError.isError
      || emailError.isError
      || passwordError.isError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, usernameError, loginError, emailError, passwordError]);

  return {
    isEmpty,
    usernameError,
    loginError,
    emailError,
    passwordError,
    inputValid
  };
};
