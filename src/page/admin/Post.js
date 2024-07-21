import React from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'
import Error from '../../component/Erorr.js'

function Post() {
  return (
    <LayoutAdmin>
        <div className='flex min-h-screen justify-center items-center overflow-hidden w-full flex-col'>
          <div className='flex justify-center items-center flex-col  min-h-screen'>
          <h1 className='text-3xl font-bold text-center text-red-500 uppercase my-5'>Demo 70% Website</h1>

          <video width="750" height="500" controls >
          <source src="https://res.cloudinary.com/dzldyflpv/video/upload/v1721538469/AD6AC114-004E-4FC2-890D-3C387647C9DE_online-video-cutter.com_z4q3gm.mp4" type="video/mp4"/>
         </video>
         </div>
         {/* <Error/> */}
        </div>

    </LayoutAdmin>
  )
}

export default Post