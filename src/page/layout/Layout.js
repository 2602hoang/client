import React from 'react'
import Header from '../../component/Header'
import Footer from '../../component/Footer'

function Layout({children}) {
  return (
    <div className='overflow-hidden h-auto w-full flex flex-col justify-center items-center'>
        <Header/>
        
            {children}
        <Footer/>
        
    </div>
  )
}

export default Layout