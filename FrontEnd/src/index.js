import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import AuthProvider from './context/auth_context';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);
