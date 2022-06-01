import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.scss';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { store } from './store/store';
import { sortOverload } from './utils/sortOverload';

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
