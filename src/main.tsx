import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './hooks/useTheme';
import PasswordGate from './components/auth/PasswordGate';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PasswordGate>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </PasswordGate>
  </React.StrictMode>
);
