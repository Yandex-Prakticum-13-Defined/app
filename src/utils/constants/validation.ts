export const VALIDATION = {
  required: 'Поле не может быть пустым',
  name: {
    value: /^[A-ZА-ЯЁ]+[A-Za-zА-Яа-яЁё-]+$/,
    message: 'Латиница или кириллица, первая буква заглавная, '
      + 'без пробелов и цифр, нет спецсимволов (допустим только дефис)'
  },
  login: {
    value: /^[a-zA-Z0-9_-]*[a-zA-Z_-][a-zA-Z0-9_-]*$/,
    message: 'Латиница, может содержать цифры, но не состоять из них, допустимы дефис и нижнее подчёркивание'
  },
  email: {
    value: /^[A-Za-z0-9.-]+@[A-Za-z0-9.-]+\.[A-Za-z]+$/,
    message: 'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательна @ и точка после,'
      + ' но перед точкой обязательно должны быть буквы'
  },
  password: {
    value: /^(?=.*[A-Z])(?=.*[0-9]).*$/,
    message: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра'
  },
  minLength_8: {
    value: 8,
    message: 'Минимальное количество символов: 8'
  },
  minLength_3: {
    value: 3,
    message: 'Минимальное количество символов: 3'
  },
  maxLength_20: {
    value: 20,
    message: 'Максимальное количество символов: 20'
  }
};
