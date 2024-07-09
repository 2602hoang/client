import React from 'react'

import Footer from '../../component/Footer'
import HeaderAdmin from '../../component/HeaderAdmin'
import ProgressBar from '../../component/ProgressBar.js'

function LayoutAdmin({children}) {
  
  return (
    <div className='overflow-hidden h-auto w-full flex flex-col '>
      <ProgressBar/>
        <HeaderAdmin/>
        
            {children}
        <Footer/>
        
    </div>
  )
}

export default LayoutAdmin