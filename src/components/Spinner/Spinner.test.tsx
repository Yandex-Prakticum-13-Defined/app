import React from 'react';
import renderer from 'react-test-renderer';
import Spinner from './Spinner';

describe('Тестируем Spinner.tsx', () => {
  it('проверяем снимок', () => {
    const spinnerComponent = renderer.create(<Spinner/>).toJSON();
    expect(spinnerComponent).toMatchSnapshot();
  });
});
