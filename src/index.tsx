import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.scss';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { sortOverload } from '../utils/sortOverload';

const root = createRoot(document.querySelector('#root')!);
root.render(<ErrorBoundary><App/></ErrorBoundary>);

sortOverload();
