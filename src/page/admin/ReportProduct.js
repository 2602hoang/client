import React, { useEffect, useState } from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'
import { Column, Line, Pie } from '@ant-design/charts';
import axios from 'axios';
import { URL } from '../../url';
import Thongkeluotbanproduct from '../../component/thongke/Thongkeluotbanproduct';
import ThongkehoanProduct from '../../component/thongke/ThongkehoanProduct';
import Thongkestockproduct from '../../component/thongke/Thongkestockproduct';
function ReportProduct() {


 
 
  
 
  return (
    <LayoutAdmin>

        <div className=' container flex-col  flex  md:w-full md:mt-5 mt-[70px] md:overflow-x-hidden overflow-x-scroll  items-center mb-5 snap-y snap-mandatory h-screen overflow-scroll  '>
          <h1 className='text-3xl font-bold text-center text-red-500 uppercase my-4'>Báo Cáo Thông Kê Sản Phẩm Shop</h1>
          {/* <div className='flex justify-center items-center flex- row mt-6 space-x-5 min-h-screen'>
          <div>
            Sản Phẩm
          </div>
          <div>
           Tài Khoản
          </div>
          <div>
            Đơn Hàng
          </div>
          </div> */}
         

          <section >
            <div className='snap-center flex justify-center   items-center px-10 flex-col w-full  h-screen'>
          <h1  className='text-3xl font-bold text-center '>Sơ đồ tổng số lượng bán theo từng sản phẩm</h1>
          <Thongkeluotbanproduct/>
          </div>
          </section>

          <section >
            <div className='snap-center   flex justify-center mt-[20px]  items-center px-10 flex-col w-full  h-screen'>
          <h1 className='text-3xl font-bold text-center '>Sơ đồ tổng số lượng sản phẩm đang treo</h1>
          <ThongkehoanProduct/>
          </div>
          </section>


          <section >
            <div className='snap-center   flex justify-center mt-[60px] items-center px-10 flex-col w-full  h-[100vh]'>
          <h1 className='text-3xl font-bold text-center '>Sơ đồ Sản phẩm có lượt tồn kho dưới 123 sản phẩm</h1>
          <Thongkestockproduct/>
          </div>
          </section>
        </div>

    </LayoutAdmin>
  )
}

export default ReportProduct