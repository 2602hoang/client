import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import Home from './page/user/Home';
import ProtectedRouteNoLogin from './routing/ProtectedRouteNoLogin';
import ProtectedRoute from './routing/ProtectedRoute';
import AuthContextProvider from './contexts/AuthContextProvider';
// import HomeAd from './page/admin/HomeAd';
import ProductMannager from './page/admin/ProductMannager';
import UserManager from './page/admin/UserMannager';
import OrderManager from './page/admin/OrderManager';
import LoginAdmin from './page/LoginAdmin';
import LoginUser from './page/LoginUser';
import ProtectedRouteUser from './routing/ProtectedRouteUser';
import ProtectedRouteUserNoLogin from './routing/ProtectedRouteUserNoLogin';
import About from './page/user/About';
import Pay from './page/user/Pay.js';
import Order from './page/user/Order';
import Product from './page/user/Product';
import ListOrder from './page/user/ListOrder.js';
import RejectOrder from './page/user/RejectOrder.js';
import User from './page/user/User.js';
import SaleProduct from './page/admin/SaleProduct.js';
import NotSaleProduct from './page/admin/NotSaleProduct.js';
import Post from './page/admin/Post.js';
import ListOrderManager from './page/admin/ListOrderManager.js';
import ReportProduct from './page/admin/ReportProduct.js';
import ReportOrder from './page/admin/ReportOrder.js';
import ReportUser from './page/admin/ReportUser.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      {/* <CartProvider> */}
      <BrowserRouter>
       
          
        <Routes>
          {/* Default route to redirect to login */}
          <Route path='/' element={<Navigate to="/login" />} />


          {/* Public routes */}
          <Route path='/login' element={
            <ProtectedRouteUserNoLogin>
              <LoginUser />
            </ProtectedRouteUserNoLogin>
          } />
          {/* User routes */}
          <Route path='/home' element={
            <ProtectedRouteUser>
              <Home />
            </ProtectedRouteUser>
          } />
          <Route path='/contact' element={
            <ProtectedRouteUser>
              <About />
            </ProtectedRouteUser>
          } />
          <Route path='/pays' element={
            <ProtectedRouteUser>
              <Pay />
            </ProtectedRouteUser>
          } />
          <Route path='/order' element={
            <ProtectedRouteUser>
              <Order />
            </ProtectedRouteUser>
          }
          />
          <Route path='/orderlist' element={
            <ProtectedRouteUser>
                <ListOrder/>
              </ProtectedRouteUser>
          }/>
          <Route path='/product' element={
            <ProtectedRouteUser>
              <Product />
            </ProtectedRouteUser>
          }
          
          />
          <Route path='orderbyme' element={
            <ProtectedRouteUser>
              <RejectOrder/>
            </ProtectedRouteUser>
          }
          />
          <Route path='user' element={
            <ProtectedRouteUser>
              <User/>
            </ProtectedRouteUser>
          }
          />
        </Routes>
     
        <Routes>
          <Route path='/admin' element={<Navigate to="/login/admin" />} />
          {/* Admin login route */}
          <Route path='/login/admin' element={
            <ProtectedRouteNoLogin>
              <LoginAdmin />
            </ProtectedRouteNoLogin>
          } />
          <Route path='/post' element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          } />

          {/* Admin routes */}
          <Route path='/productmanager' element={
            <ProtectedRoute>
              <ProductMannager />
            </ProtectedRoute>
          } />
          <Route path='/saleproduct' element={
            <ProtectedRoute>
              <SaleProduct/>
              </ProtectedRoute>
          }/>
          <Route path='/notsaleproduct' element={
            <ProtectedRoute>
              <NotSaleProduct/>
              </ProtectedRoute>
          }/>
          <Route path='/listordermanager' element={
            <ProtectedRoute>
              <ListOrderManager/>
              </ProtectedRoute>
          }/>
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
           <Route path='/reportorder' element={
            <ProtectedRoute>
              <ReportOrder/>
            </ProtectedRoute>
          } />
           <Route path='/reportuser' element={
            <ProtectedRoute>
              <ReportUser/>
            </ProtectedRoute>
          } />
          <Route path='/reportproduct' element={
            <ProtectedRoute>
              <ReportProduct />
            </ProtectedRoute>
          } />
        </Routes>
        
      </BrowserRouter>
      {/* </CartProvider> */}
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
