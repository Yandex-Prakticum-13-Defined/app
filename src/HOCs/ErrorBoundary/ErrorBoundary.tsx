import React, { Component, ErrorInfo, ReactNode } from 'react';
import image from '../../images/something-gone-wrong.png';
import './ErrorBoundary.scss';

interface IErrorBoundaryProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-boundary'>
          <img src={image} alt='Ошибка!' className='error-boundary__image'/>
          <div className='error-boundary__text-container'>
            <h2 className='error-boundary__text'>Что-то пошло не так...</h2>
            <p className='error-boundary__text'>Попробуйте перейти на главную или перезагрузить страницу</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
