import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContextProvider from './context/AppContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppContextProvider>
      <AuthProvider>
        <ToastContainer/>
        <App />
      </AuthProvider>
  </AppContextProvider>
);