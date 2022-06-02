import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.scss';
import { ErrorBoundary } from './HOCs/ErrorBoundary/ErrorBoundary';
import { store } from './store/store';
import { sortOverload } from './utils/sortOverload';
import { IAsyncData } from './store/interface';
import { IUserData } from './store/slice/userSlice';

declare global {
  interface Window {
    __INITIAL_STATE__: {
      user: IAsyncData<IUserData>;
      helper: {
        firstLoading: boolean;
      };
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.querySelector('#root')!;
hydrateRoot(
  container, (
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  )
);

sortOverload();
