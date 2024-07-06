import React from 'react'

import Footer from '../../component/Footer'
import HeaderAdmin from '../../component/HeaderAdmin'

function LayoutAdmin({children}) {
  return (
    <div className='overflow-hidden h-auto w-full flex flex-col '>
        <HeaderAdmin/>
        
            {children}
        <Footer/>
        
    </div>
  )
}

export default LayoutAdmin