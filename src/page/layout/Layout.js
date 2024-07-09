import React from 'react'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import ProgressBar from '../../component/ProgressBar.js'

function Layout({children}) {
  return (
    <div className='overflow-hidden h-auto w-full flex flex-col justify-center items-center'>
      <ProgressBar/>
        <Header/>
        
            {children}
        <Footer/>
        
    </div>
  )
}

export default Layout