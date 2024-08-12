import React, { useContext, useEffect, useState } from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import ProgressBar from '../../component/ProgressBar.js';
import { AuthContext } from '../../contexts/AuthContextProvider.js';
// import { Spin } from 'antd';
import {SpinnerLayout} from '../../component/SpinnerLayout.js';

function Layout({ children }) {
  const { cart } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to simulate loading delay
    const timer = setTimeout(() => setLoading(false), 500);
    
    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <SpinnerLayout  className='h-screen w-full flex justify-center items-center'  />
      ) : (
        <div className='overflow-hidden h-auto w-full flex flex-col justify-center items-center'>
          <ProgressBar />
          <Header cart={cart} />
          {children}
          <Footer />
        </div>
      )}
    </>
  );
}

export default Layout;
