import React, { useContext, useState } from 'react'
import background from '../assets/hinh.png'
import { LogoutOutlined, MenuOutlined, } from '@ant-design/icons';
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
  return (
    <div className='overflow-hidden justify-center flex fixed md:relative  items-center
    flex-row bg-[#241f32]  h-[60px] md:w-full z-50 w-full top-0 '>

             <nav className='overflow-hidden justify-between items-center py-2 flex  md:w-4/5 w-full mx-2'>
                <div className='md:flex top-0 left-0 right-0  z-50  md:z-50   md:w-72 flex flex-row md:mr-auto  '>
                    <a href='/productmanager' className='font-black flex  items-center gap-x-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>
                        <img src={background} className=' space-x-1 h-12 w-16 rounded-full' />
                        H3
                    </a>
                </div>

                <ul id="menu" className={`
                   py-4  
            flexd
            md:space-y-0
               bg-sky-300
                fixed z-20 top-0 left-0 w-full h-full flex font-bold flex-col justify-center items-center  ${menuVisible ? 'min-h-full' : 'invisible'
                    } md:visible md:bg-transparent md:h-auto md:flex-row md:justify-between md:static
                    }`}>
                    {/* <li className='my-5 md:m-0'>
                        <a href='/' className=' text-white hover:border-b-2 hover:animate-ping
                         hover:border-red-500 hover:text-red-500
                          transition duration-500 ease-in'>Trang Chủ</a></li> */}
                    <li className='my-5 md:m-0'>
                        <a href='/productmanager' className=' text-white hover:border-b-2 hover:animate-ping
                         hover:border-red-500 hover:text-red-500
                          transition duration-500 ease-in'>Quản Lý Sản Phẩm</a></li>
                    <li className='my-5 md:m-0'>
                        <a href='/accountmanager' className=' text-white hover:border-b-2 hover:animate-ping
                         hover:border-red-500 hover:text-red-500
                          transition duration-500 ease-in'>Quản Lý Tài Khoản</a></li>
                    <li className='my-5 md:m-0'>
                        <a href='/ordedmanager' className=' text-white hover:border-b-2 hover:animate-ping
                         hover:border-red-500 hover:text-red-500
                          transition duration-500 ease-in'>Quản Lý đơn Hàng</a></li>
                    <li className='my-5 md:m-0'>
                        <a href='/report' className=' text-white hover:border-b-2 hover:animate-ping
                         hover:border-red-500 hover:text-red-500
                          transition duration-500 ease-in'>Thống kê</a></li>
                        <li className='my-5 md:m-0'>   
                <svg onClick={() => {handlelogout(); nav("/")}} xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                         viewBox="0 0 24 24" fill="none"><path stroke="#FF8A65" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                          stroke-width="1.5" d="M17.44 14.62L20 12.06 17.44 9.5M9.76 12.06h10.17M11.76 20c-4.42 0-8-3-8-8s3.58-8 8-8"></path></svg>
               
               </li>
                      

                       
                </ul>
                
                <div id='menu-button' className='absolute  top-5 right-5  md:hidden cursor-pointer z-50 flexd' onClick={toggleMenu}>


                    <MenuOutlined style={{ color: 'black', fontSize: "20px" }} />

                </div>

            </nav>

    </div>
  )
}

export default HeaderAdmin