import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Login from './page/Login';
import Home from './page/user/Home';
import ProtectedRouteNoLogin from './routing/ProtectedRouteNoLogin';
import ProtectedRoute from './routing/ProtectedRoute';
import AuthContextProvider from './contexts/AuthContextProvider';
import HomeAd from './page/admin/HomeAd';
import ProductMannager from './page/admin/ProductMannager';
import UserManager from './page/admin/UserMannager';
import OrderManager from './page/admin/OrderManager';
import Report from './page/admin/Report';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    
  <BrowserRouter>
  <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={
            <ProtectedRouteNoLogin>
              <Login />
            </ProtectedRouteNoLogin>
          } />
          <Route path='/home' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/productmanager' element={
            <ProtectedRoute>
              <ProductMannager />
            </ProtectedRoute>
          } />
          <Route path='/accountmanager' element={
            <ProtectedRoute>
              <UserManager />
            </ProtectedRoute>
          } />
          <Route path='/ordermanager' element={
            <ProtectedRoute>
              <OrderManager />
            </ProtectedRoute>
          } />
          <Route path='/report' element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          } />
        </Routes>
  </BrowserRouter>
  </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
