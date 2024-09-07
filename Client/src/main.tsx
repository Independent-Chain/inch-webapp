import React from 'react';
import ReactDOM from 'react-dom/client';

// Custom hooks;
import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import { AuthProvider } from './context/AuthContext/AuthProvider.tsx';
import { NotificationProvider } from './context/NotificationContext/NotificationProvider.tsx';
import { LocalizationProvider } from './context/LocaleContext/LocalizationProvider.tsx';

// Custom components;
import App from './app/App.tsx'; // App - root component of application;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WebAppProvider>
    <AuthProvider>
      <LocalizationProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </LocalizationProvider>
    </AuthProvider>
  </WebAppProvider>
)
