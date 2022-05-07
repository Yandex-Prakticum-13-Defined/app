import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.scss';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { store } from './store/store';
import { sortOverload } from './utils/sortOverload';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.querySelector('#root')!);
root.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App/>
    </ErrorBoundary>
  </Provider>
);

sortOverload();
