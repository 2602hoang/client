import React, { useContext } from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'
import ThongkeUser from '../../component/thongke/ThongkeUser'
import { AuthContext } from '../../contexts/AuthContextProvider';
import { Button, Result } from 'antd';

function ReportUser() {
  const {userId}= useContext(AuthContext);
  return (
    <LayoutAdmin>
      {parseInt(userId) === 84 ? (
    <div className='flex-col  flex  md:w-full md:mt-5 mt-[70px] md:overflow-x-hidden overflow-x-scroll  items-center mb-5   '>
       <h1 className='text-3xl font-bold text-center text-red-500 uppercase my-4'>Thông Kê Tài Khoản</h1>
       <ThongkeUser/>
    </div>)
    :
    <div className='flex justify-center items-center min-h-screen'>
       <Result
            status="403"
            title={ <h1 className="text-3xl font-bold text-center text-red-500 uppercase my-4">
              403 Lỗi phân quyền
            </h1>}
            subTitle="Rất tiếc, bạn không được phép truy cập trang này."
            extra={<Button href="/" type="primary">Về Trang Chủ</Button>}
          />
    </div>
    }

 </LayoutAdmin>
  )
}

export default ReportUser