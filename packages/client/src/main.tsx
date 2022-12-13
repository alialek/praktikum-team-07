import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { ClientApp } from '@/components/App/App';

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ClientApp />
  </React.StrictMode>,
);
