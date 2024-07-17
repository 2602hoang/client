import React from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'
import ThongkeUser from '../../component/thongke/ThongkeUser'

function ReportUser() {
  return (
    <LayoutAdmin>
    <div className='flex-col  flex  md:w-full md:mt-5 mt-[70px] md:overflow-x-hidden overflow-x-scroll  items-center mb-5   '>
       <h1 className='text-3xl font-bold text-center text-red-500 uppercase my-4'>Thông Kê Tài Khoản</h1>
       <ThongkeUser/>
    </div>

 </LayoutAdmin>
  )
}

export default ReportUser