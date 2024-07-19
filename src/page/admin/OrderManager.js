import React, { useContext, useState } from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'
import NavabarOrder from '../../component/NavabarOrder'
import OrderManagerList from '../../component/OrderManagerList';
import OrderfinishedManager from '../../component/OrderfinishedManager';
import ThongkeOrderThanhCong from '../../component/thongke/ThongkeOrderThanhCong';
import { AuthContext } from '../../contexts/AuthContextProvider';

function OrderManager() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [subMenuVisible, setSubMenuVisible] = useState({});
    const [activeMenuItem, setActiveMenuItem] = useState('Danh sách');
    const {userId} = useContext(AuthContext);
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const toggleSubMenu = (index) => {
        setSubMenuVisible((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };
    const navigateToList = () => {
      setActiveMenuItem('Danh sách cần xử lý');
    };
    const renderContent = () => {
        switch (activeMenuItem) {
          case 'Danh sách cần xử lý':
            return (<div className='text-center text-3xl md:text-4xl w-full font-black '>
              <h1>Danh sách Đơn Hàng Chờ Xác Nhận</h1>
              
              <OrderManagerList navigateToList={navigateToList}/>
          
            </div>);
            case 'Hoàn thành trạng thái đơn':
              return (<div className='text-center text-3xl md:text-4xl w-full font-black '>
                 <h1>Hoàn thành trạng thái đơn</h1>
                <OrderfinishedManager/>
                
              </div>);
          case 'Thống kê':
            return (<div className='text-center text-3xl md:text-4xl w-full font-black '>
            <h1 className='text-3xl font-bold text-center text-red-500 uppercase my-4'>Thông Kê Doanh Số</h1>
            <ThongkeOrderThanhCong/>
            </div>);
          default:
            return (<div className='text-center text-3xl md:text-4xl w-full font-black '>
              <h1>Danh sách Đơn Hàng Chờ Xác Nhận</h1>
              <OrderManagerList/>
            </div>);
        }
      };
    return (
        <LayoutAdmin>
            {parseInt(userId) === 84 ? (
              
           
            <div className='flex flex-row mt-[65px] w-full md:mt-0'>

                <div className={`min-h-screen flex-col flex ${menuVisible ? 'md:w-2/5 w-full' : 'w-[60px]'} transition-all duration-500`}>

                    <NavabarOrder 
                    setActiveMenuItem={setActiveMenuItem}
                    menuVisible={menuVisible}
                        toggleMenu={toggleMenu} subMenuVisible={subMenuVisible}
                        toggleSubMenu={toggleSubMenu} />
                </div>
                <div className={`min-h-screen  flex-col flex ${menuVisible ? 'w-0 md:w-4/5 hidden md:block' : 'w-full'} transition-all duration-500`}>
               {renderContent()}
                </div>


            </div>
             ):
             <div className='flex justify-center items-center min-h-screen'>
              <h1 className='text-3xl font-bold text-center text-red-500 uppercase my-4'>Bạn không được phép truy cập</h1>
             </div>
             }
        </LayoutAdmin>
    )
}

export default OrderManager