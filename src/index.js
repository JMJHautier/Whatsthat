import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'fontsource-roboto';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme.js'
import AuthState from './context/AuthContext'; 

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter> 
      <AuthState> 
          <ThemeProvider theme={theme}> 
            <CssBaseline />
            <App />
          </ThemeProvider>
      </AuthState>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);