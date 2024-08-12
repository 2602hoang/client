import React, { useEffect, useState } from 'react'

import Footer from '../../component/Footer'
import HeaderAdmin from '../../component/HeaderAdmin'
import ProgressBar from '../../component/ProgressBar.js'
import { SpinnerLayout1 } from '../../component/SpinnerLayout.js';

function LayoutAdmin({children}) {
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
      <SpinnerLayout1  className='h-screen w-full flex justify-center items-center'  />
    ) : (<div className='overflow-hidden w-full flex flex-col  justify-center items-center'>
      <ProgressBar/>
        <HeaderAdmin/>
        
            {children}
        <Footer/>
        
    </div>)}
    </>
  )
}

export default LayoutAdmin