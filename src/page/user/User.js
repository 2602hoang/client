import React, { useContext, useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { AuthContext } from '../../contexts/AuthContextProvider';
import { URL } from '../../url';
import axios from 'axios';
import { formattedTimestamp } from '../../untils';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Avatar } from 'antd';

function User() {
  const nav = useNavigate();

  const { user, Logout } = useContext(AuthContext);
  const handlelogout = async () => {
    await Logout()
    window.location.reload(false);
  }
  // console.log("12",user.avatar)
  return (

    <Layout>
      <div data-aos="fade-left" className='min-h-screen  justify-center items-center'>
        <a
          // href="#"
          className="relative w-11/12 block  rounded-lg border-8  border-gray-100 p-4 mt-[100px] mx-2 sm:p-6 lg:p-8"
        >
          <span
            className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
          ></span>

          <div className="sm:flex sm:justify-between sm:gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                Thông tin cá nhân
              </h3>

              <p className=" text-xs mt-2 font-medium text-gray-600">Tên người dùng : {user.username}</p>
              <p className=" text-xs mt-2 font-medium text-gray-600">Số điện thoại : {user.phone}</p>
              <p className="text-xs text-gray-500 mb-2">Ngày Tạo {formattedTimestamp(user.created_at)}</p>
            </div>

            <div className="">
              
              
              {user.avatar !== null ? (
                <img
                alt=""
                src={user.avatar}
                className="size-16 rounded-lg object-cover shadow-sm"
              />
                
              ):
            (<Avatar>{user.id_role === 123 ? "QL" : user.id_role === 124 ? "NV" : 'KH'}</Avatar>)
            }
              
            </div>
          </div>

          <div className="mt-4">
            <p className="text-pretty text-sm text-gray-500">
              "Cuốn sách là cánh cửa mở ra thế giới vô tận của tri thức và sự tưởng tượng"
            </p>
          </div>

          <dl className="mt-6 flex gap-4 sm:gap-6">
            <div className="flex flex-col-reverse">

              <dt className="text-sm font-medium text-gray-600">Chức năng:</dt>
              <dt className="text-sm font-medium text-gray-600">Trạng thái:</dt>
            </div>

            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium text-gray-600">{user.id_role === 123 ? "Quản lý" : user.id_role === 124 ? "Nhân viên" : 'Khách Hàng'}</dt>
              <dd className={`text-xs text-gray-500 ${user.status === false ? 'text-green-500' : 'text-red-500'}`}>{user.status === false ? 'Hoạt động' : 'Ngưng hoạt động'}</dd>

            </div>
          </dl>
          <button
                    onClick={() => {
                      handlelogout();
                      nav("/");
                    }}
                    class="group flex w-1/4 items-center justify-center mx-20 md:mx-1 mt-4 h-8 bg-red-600 rounded-full cursor-pointer relative  overflow-hidden transition-all
                     duration-200 shadow-lg hover:w-2/5 md:px-6 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                  >
                    <div
                      class="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
                    >
                      <svg class="w-4 h-4" viewBox="0 0 512 512" fill="white">
                        <path
                          d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                        ></path>
                      </svg>
                    </div>

                    <div
                      class="absolute transform translate-x-full opacity-0 text-white text-lg font-semibold hover:text-center ml-4
                       transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      Đăng xuất
                    </div>
                  </button>
        </a>
        

      </div>
    </Layout>
  )
}

export default User