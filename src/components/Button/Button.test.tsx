import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Тестируем Button.tsx', () => {
  it('проверяем снимок', () => {
    const buttonComponent = renderer.create(<Button type='button'/>).toJSON();
    expect(buttonComponent).toMatchSnapshot();
  });

  it('содержит текст', () => {
    const { getByText } = render(<Button type='button' title='Тестовая кнопка'/>);
    expect(getByText('Тестовая кнопка')).toBeInTheDocument();
  });

  it('активна по умолчанию', () => {
    const { getByText } = render(<Button type='button' title='Тестовая кнопка'/>);
    expect(getByText('Тестовая кнопка')).toBeEnabled();
  });

  it('заблокирована при передаче disabled', () => {
    const { getByText } = render(<Button type='button' title='Тестовая кнопка' disabled/>);
    expect(getByText('Тестовая кнопка')).toBeDisabled();
  });

  it('вызывается событие click', async () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button type='button' title='Тестовая кнопка' onClick={handleClick}/>);
    const user = userEvent.setup();
    await user.click(getByText('Тестовая кнопка'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
