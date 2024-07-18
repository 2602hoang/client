import React, { useContext } from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'
import ThongkeOrderThanhCong from '../../component/thongke/ThongkeOrderThanhCong'
import { AuthContext } from '../../contexts/AuthContextProvider';

function ReportOrder() {
  const {userId}= useContext(AuthContext);
  return (
    <LayoutAdmin>
      {parseInt(userId) === 84 ? (
       <div className='flex-col  flex  md:w-full md:mt-5 mt-[70px] md:overflow-x-hidden overflow-x-scroll  items-center mb-5   '>
          <h1 className='text-3xl font-bold text-center text-red-500 uppercase my-4'>Thông Kê Doanh Số</h1>
          <ThongkeOrderThanhCong/>
       </div>
      ):
      <div className='flex justify-center items-center min-h-screen'>
        <h1 className='text-3xl font-bold text-center text-red-500 uppercase my-4'>Bạn không có quyền truy cập</h1>
      </div>
      }

    </LayoutAdmin>
  )
}

export default ReportOrder