import React, { useContext, useEffect, useState } from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import ProgressBar from '../../component/ProgressBar.js';
import { AuthContext } from '../../contexts/AuthContextProvider.js';
// import { Spin } from 'antd';
import {SpinnerLayout} from '../../component/SpinnerLayout.js';
import { FloatButton } from 'antd';
import { CommentOutlined, FacebookOutlined, InstagramOutlined, MessageOutlined, PhoneFilled, XOutlined } from '@ant-design/icons';

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
          <FloatButton.Group 
            trigger="click"
           
            type='primary'
            tooltip="Liên Hệ"
            icon={<MessageOutlined />}
            className="" shape="circle" style={{ left: 10, bottom: "30%" }}>
              <FloatButton
                tooltip="Facebook "
                target="_blank"
                
                href=""
                // style={{backgroundColor: "blue",color:"blue"}}
                icon={<FacebookOutlined style={{color:"blue"}}/>}
              />
              <FloatButton
                tooltip="X "
                target="_blank"
                // style={{backgroundColor: "black",color:"black"}}
                href=""
                icon={<XOutlined />}
              />
                <FloatButton
                tooltip="Instagram "
                target="_blank"
                href=""
                icon={<InstagramOutlined style={{color:"#8A3AB9"}}/>}
              />
              <FloatButton
                tooltip="Nhắn Cho Tôi"
                icon={<CommentOutlined style={{color:"#2596be"}}/>}
                target="_blank"
                href=""
              />
              <FloatButton
               tooltip="Gọi Cho tôi"
               icon={<PhoneFilled style={{color:"green"}}/>}
               target="_blank"
               href=""
             />
              {/* <FloatButton.BackTop visibilityHeight={0} /> */}
            </FloatButton.Group>
          {children}
          <Footer />
        </div>
      )}
    </>
  );
}

export default Layout;
