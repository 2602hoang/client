import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Login from './page/Login';
import Home from './page/Home';
import ProtectedRouteNoLogin from './routing/ProtectedRouteNoLogin';
import ProtectedRoute from './routing/ProtectedRoute';
import AuthContextProvider from './contexts/AuthContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    
  <BrowserRouter>
      <Routes>
      <Route path='/'element={
            <ProtectedRouteNoLogin>
              <Login/>
            </ProtectedRouteNoLogin>
          }  />
        <Route path='/home' element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
      </Routes>
  </BrowserRouter>
  </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
