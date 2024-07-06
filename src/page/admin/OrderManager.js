import React, { useState } from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'
import NavabarOrder from '../../component/NavabarOrder'

function OrderManager() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [subMenuVisible, setSubMenuVisible] = useState({});
    const [activeMenuItem, setActiveMenuItem] = useState('Danh sách');
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const toggleSubMenu = (index) => {
        setSubMenuVisible((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };
    const renderContent = () => {
        switch (activeMenuItem) {
          case 'Danh sách':
            return (<div className='text-center text-5xl font-black'>
              <h1>Danh sách Đơn Hàng</h1>
                {/* <ListProduct/> */}
    
            </div>);
          case 'Chỉnh sửa':
            return <h1 className='text-center text-5xl font-black'>Chỉnh sửa</h1>;
          case 'Ghi chú':
        //     return <h1 className='text-center text-5xl font-black'>Thêm</h1>;
        //   case 'Xóa':
            return <h1 className='text-center text-5xl font-black'>Ghi chú</h1>;
          case 'Thống kê':
            return <h1 className='text-center text-5xl font-black'>Thống kê</h1>;
          default:
            return <h1 className='text-center text-5xl font-black'>Danh sách Đơn Hàng</h1>;
        }
      };
    return (
        <LayoutAdmin>
            <div className='flex flex-row mt-[65px] w-full md:mt-0'>

                <div className={`min-h-screen flex-col flex ${menuVisible ? 'md:w-1/5 w-2/3' : 'w-[60px]'} transition-all duration-500`}>

                    <NavabarOrder 
                    setActiveMenuItem={setActiveMenuItem}
                    menuVisible={menuVisible}
                        toggleMenu={toggleMenu} subMenuVisible={subMenuVisible}
                        toggleSubMenu={toggleSubMenu} />
                </div>
                <div className={`min-h-screen  flex-col flex ${menuVisible ? 'w-0 md:w-4/5' : 'w-full'} transition-all duration-500`}>
               {renderContent()}
                </div>


            </div>
        </LayoutAdmin>
    )
}

export default OrderManager