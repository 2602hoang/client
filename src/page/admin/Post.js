import React from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'
import Error from '../../component/Erorr.js'

function Post() {
  return (
    <LayoutAdmin>
        <div className='flex min-h-screen justify-center items-center overflow-hidden w-full'>
          <Error/>
        </div>

    </LayoutAdmin>
  )
}

export default Post