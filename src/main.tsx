import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './index.css';
import './training-theme.css';

if (import.meta.env.DEV && new URLSearchParams(location.search).has('measure')) {
  void import('./core/measurePerformance').then(({ measurePerformance }) => measurePerformance());
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
