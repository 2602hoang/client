import React, { useContext, useState } from 'react'
import background from '../assets/hinh.png'
import { CaretDownOutlined, CloseCircleFilled, LogoutOutlined, MenuOutlined, } from '@ant-design/icons';
import { AuthContext } from '../contexts/AuthContextProvider';
import { useNavigate } from 'react-router-dom';

function HeaderAdmin() {
    const [menuVisible, setMenuVisible] = useState(false);
    const nav = useNavigate();
    const { Logout } = useContext(AuthContext);
    const handlelogout = async () => {
        await Logout()
        window.location.reload(false);
    }
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
    

   
    const [subMenuVisible1, setSubMenuVisible1] = useState(false);
  
    const toggleSubMenu1 = () => {
      setSubMenuVisible1(!subMenuVisible1);
    };
    const [subMenuVisible2, setSubMenuVisible2] = useState(false);
  
    const toggleSubMenu2 = () => {
      setSubMenuVisible2(!subMenuVisible2);
    };

    const [subMenuVisible, setSubMenuVisible] = useState(false);
  
    const toggleSubMenu = () => {
      setSubMenuVisible(!subMenuVisible);
    };
    return (
        <div className=' justify-center flex fixed md:relative  items-center
    flex-row bg-[#539ba9]  h-[60px] md:w-full z-40 w-full top-0 '>

            <nav className=' justify-start items-center py-2 flex md:ml-6 md:w-full w-full mx-2'>
                <div className='md:flex top-0 left-0 right-0  z-50  md:z-50   md:w-1/5 flex flex-row md:mr-auto  '>
                    <a href='/post' className='font-black flex  items-center gap-x-2 bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-yellow-400'>
                        <img src={background} className=' space-x-1 h-12 w-16 rounded-full' />
                        Admin
                    </a>
                </div>

                <ul id="menu" className={`
                   py-4  
            flexd
            md:space-y-0
               bg-sky-300
                fixed z-20 top-0 left-0 w-full h-full flex font-bold flex-col justify-center items-center  ${menuVisible ? ' h-screen overflow-y-visible fixed w-full' : 'invisible'
                    } md:visible md:bg-transparent md:h-auto md:flex-row md:justify-between md:static
                    }`}>
                    <li className='my-5 md:m-0'>
                        <a href='/post' className=' text-white hover:border-b-2 hover:animate-ping
                         hover:border-red-500 hover:text-red-500
                          transition duration-500 ease-in'>Trang Chủ</a></li>
                    <li className='my-5 md:m-0 relative text-center'>
                        <a 
                        onClick={toggleSubMenu1} className='text-white hover:border-b-2 hover:border-red-500 hover:text-red-500 justify-center transition duration-500 ease-in'
                          >Quản Lý Sản Phẩm {subMenuVisible1 ? <CloseCircleFilled style={{ fontSize: '15px' }} /> : <CaretDownOutlined style={{ fontSize: '15px' }}/>}
                        </a>
                       
                        <ul className={`md:absolute relative md:text-start text-center ${subMenuVisible1 ? 'mt-3 opacity-80  rounded-br-xl rounded-bl-xl' : 'hidden'}`}>
                            <div className='md:w-[200px] flex flex-col rounded-br-lg
                             rounded-bl-lg space-y-4 mt-2 w-full p-2 md:bg-[#539ba9]
                              bg-sky-300 text-white  '>
                                <li>
                                    <a
                                        href='/productmanager'
                                    >Tất cả sản phẩm</a>
                                </li>

                                <li>
                                    <a href='/saleproduct'>Sản phẩm đang bán</a>
                                </li>

                                <li>
                                    <a href='/notsaleproduct'>Sản phẩm nghừng bán</a>
                                </li>
                            </div>
                        </ul>
                      

                    </li>
                    <li className='my-5 md:m-0'>
                        <a href='/accountmanager' className=' text-white hover:border-b-2 hover:animate-ping
                         hover:border-red-500 hover:text-red-500
                          transition duration-500 ease-in'>Quản Lý Tài Khoản</a></li>
                    <li className='my-5 md:m-0'>
                        <a
                        onClick={toggleSubMenu}
                        // href='/ordermanager'
                         className=' text-white hover:border-b-2 hover:animate-ping
                         hover:border-red-500 hover:text-red-500
                          transition duration-500 ease-in'>
                            Quản Lý đơn Hàng{subMenuVisible ? <CloseCircleFilled style={{ fontSize: '15px' }} /> : <CaretDownOutlined style={{ fontSize: '15px' }}/>}
                          
                        </a>
                        <ul className={`md:absolute relative md:text-start text-center ${subMenuVisible ? 'mt-3 opacity-80  rounded-br-xl rounded-bl-xl' : 'hidden'}`}>
                            <div className='md:w-[200px] flex flex-col rounded-br-lg
                             rounded-bl-lg space-y-4 mt-2 w-full p-2 md:bg-[#539ba9]
                              bg-sky-300 text-white  '>
                                <li>
                                    <a
                                        href='/ordermanager'
                                    >Đơn hàng cần xử lý</a>
                                </li>

                                <li>
                                    <a href='/listordermanager'>Tất cả đơn hàng</a>
                                </li>

                                {/* <li>
                                    <a href='/notsaleproduct'>Sản phẩm nghừng bán</a>
                                </li> */}
                            </div>
                        </ul>
                          
                          
                    </li>
                    <li className='my-5 md:m-0 text-center'>
                        <a onClick={toggleSubMenu2} className=' text-white hover:border-b-2 hover:animate-ping
                         hover:border-red-500 hover:text-red-500
                          transition duration-500 ease-in'>Thống kê
                          {subMenuVisible2 ? <CloseCircleFilled style={{ fontSize: '15px' }} /> : <CaretDownOutlined style={{ fontSize: '15px' }}/>}
                          </a>
                          <ul className={`md:absolute relative md:text-start text-center ${subMenuVisible2 ? 'mt-3 opacity-80  rounded-br-xl rounded-bl-xl' : 'hidden'}`}>
                            <div className='md:w-[200px] flex flex-col rounded-br-lg
                             rounded-bl-lg space-y-4 mt-2 w-full p-2 md:bg-[#539ba9]
                              bg-sky-300 text-white  '>
                                <li>
                                    <a
                                        href='/reportproduct'
                                    >Thống kê sản phẩm</a>
                                </li>

                                <li>
                                    <a href='/reportuser'>Thống kê tài khoản</a>
                                </li>
                                <li>
                                    <a href='/reportorder'>Thống kê đơn hàng</a>
                                </li>

                                {/* <li>
                                    <a href='/notsaleproduct'>Sản phẩm nghừng bán</a>
                                </li> */}
                            </div>
                        </ul>
                          
                          
                    
                    </li>
                    <li className='my-5 md:m-0'>
                      
                    <div className='w-full flex justify-center items-center text-center'>
                                <button
                    onClick={() => {
                      handlelogout();
                      nav("/admin");
                    }}
                    class="group flex  items-center justify-center  w-8 h-8 bg-red-600 rounded-full cursor-pointer relative  overflow-hidden transition-all
                     duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
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
                    </div>
                    </li>



                </ul>

                <div id='menu-button' className='absolute  top-5 right-5  md:hidden cursor-pointer z-50 flexd' onClick={toggleMenu}>


                    <MenuOutlined style={{ color: 'white', fontSize: "20px" }} />

                </div>

            </nav>

        </div>
    )
}

export default HeaderAdmin