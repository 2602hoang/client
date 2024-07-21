import React, { useContext } from 'react'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import ProgressBar from '../../component/ProgressBar.js'
import  { AuthContext } from '../../contexts/AuthContextProvider.js';



function Layout({children}) {
  const {cart,userId} = useContext(AuthContext);
  // console.log(cart);
  // console.log(userId);
  return (
    <div className='overflow-hidden h-auto w-full flex flex-col justify-center items-center'>
      <ProgressBar/>
        <Header cart={cart}/>
       
            
            {children}
        <Footer/>
        
    </div>
  )
}

export default Layout