import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from '@/components/App';

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
