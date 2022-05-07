import React from 'react';
import { createRoot } from 'react-dom/client';
import { sortOverload } from './utils/sortOverload';
import App from './App';
import './index.scss';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.querySelector('#root')!);
root.render(<ErrorBoundary><App/></ErrorBoundary>);

sortOverload();
