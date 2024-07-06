import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider } from './provider/AuthContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter as Router

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router> {/* Wrap your application with Router */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
