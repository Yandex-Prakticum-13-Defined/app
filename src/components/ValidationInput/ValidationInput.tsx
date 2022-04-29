import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import './ValidationInput.scss';

const emptyTextMessage = 'Это поле не должно быть пустым';

interface IValidationInput extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string; /** Текст label */
  regexp: RegExp; /** Регулярка для проверки валидации инпута */
  checkValidation: (isValid: boolean) => void; /** Возвращает в родительский компонент результат валидации */
  errorMessage: string; /** Сообщение об ошибке */
  onTextChange: (text: string) => void; /** Возвращает в родительский компонент текст инпута */
}

/** Компонент input с валидацией и label (опционально) */
export const ValidationInput: React.FC<IValidationInput> = (props) => {
  const {
    labelText, regexp, checkValidation, errorMessage, onTextChange, ...rest
  } = props;
  const [isValid, setIsValid] = useState(true);
  const [needValidate, setIsNeedValidate] = useState(false);
  const [text, setText] = useState('');
  const isEmpty = text === '';

  const validate = (inputText: string) => {
    const validationResult = regexp.test(inputText);
    console.log('inputText: ', inputText);
    console.log('validationResult: ', validationResult);
    setIsValid(validationResult);
    checkValidation(validationResult);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    onTextChange(e.target.value);
    if (needValidate) {
      validate(e.target.value);
    }
  };

  const onInputBlur = () => {
    setIsNeedValidate(true);
    validate(text);
  };

  return (
    <div className='input'>
      {labelText && <label>{labelText}</label>}
      <input {...rest} onChange={onInputChange} onBlur={onInputBlur} />
      {!isValid && (
        <div className='input__error'>
          {isEmpty ? emptyTextMessage : errorMessage}
        </div>
      )}
    </div>
  );
};
