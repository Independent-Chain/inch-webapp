import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';

// Custom hooks;
import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import { AuthProvider } from './providers/AuthProvider.tsx';
import { DataProvider } from './providers/DataProvider.tsx';
import { LocalizationProvider } from './providers/LocalizationProvider.tsx';
import { NotificationProvider } from './providers/NotificationProvider.tsx';

// Custom components;
import App from './app/App.tsx'; // App - root component of application;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WebAppProvider>
    <AuthProvider>
      <DataProvider>
        <LocalizationProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </LocalizationProvider>
      </DataProvider>
    </AuthProvider>
  </WebAppProvider>
)
