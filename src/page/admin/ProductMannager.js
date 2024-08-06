import React, { useContext, useEffect, useState } from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'

import { Button, } from 'antd';
import {  ExportOutlined,  } from '@ant-design/icons';

import NavabarPoduct from '../../component/NavabarPoduct';
import ListProduct from '../../component/ListProduct';
import AddProduct from '../../component/AddProduct';
import axios from 'axios';
import { URL } from '../../url';
// import Search from 'antd/es/transfer/search';
import { AuthContext } from '../../contexts/AuthContextProvider';
import SaleProduct from './SaleProduct';
import Thongkeluotbanproduct from '../../component/thongke/Thongkeluotbanproduct';
import ThongkehoanProduct from '../../component/thongke/ThongkehoanProduct';
import Thongkestockproduct from '../../component/thongke/Thongkestockproduct';

function ProductMannager({id_role}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [subMenuVisible, setSubMenuVisible] = useState({});
  const [activeMenuItem, setActiveMenuItem] = useState('Danh sách');
  const {userToken} = useContext(AuthContext);

  // console.log(id_role);
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
    setActiveMenuItem('Danh sách');
  };


  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const getCategories = async () => {
    try {
      const token = userToken;
      const response = await axios.get(`${URL}api/v1/category/getall`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getBrands = async () => {
    try {
      const token = userToken;
      const response = await axios.get(`${URL}api/v1/brand/getall`,
        {
          headers: {
            Authorization: `Bearer ${token}`
        },
        }
      );
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };
  

  useEffect(() => {
    getCategories();
    getBrands();
  }, [userToken]);
  // console.log(userToken);
  
  const renderContent = () => {
    switch (activeMenuItem) {
      case 'Danh sách':
        return (<div className='text-center text-3xl md:text-4xl w-full font-black overflow-hidden'>
          <h1 className='my-4'>Danh sách Sản Phẩm</h1>
          <div className='w-full'>


            <ListProduct categories={categories} brands={brands} getCategories={getCategories} getBrands={getBrands} />
            {/* <SaleProduct/> */}
          </div>
        </div>);
      case 'Chỉnh sửa':
        return <h1 className='text-center text-5xl font-black'>Chỉnh sửa</h1>;
      case 'Thêm':
        return (<div className='text-center justify-center items-center overflow-hidden  flex-col flex text-5xl font-black w-full space-y-4 mb-4'>
          <h1 className='mb-8'>Thêm  Sản Phẩm</h1>
          <AddProduct categories={categories} brands={brands} getCategories={getCategories} getBrands={getBrands} navigateToList={navigateToList} />
          <Button  data-aos="fade-down" type="link" icon={<ExportOutlined style={{ fontSize: '24px' }} />} className='h-12 bg-orange-300 md:w-2/12  justify-center items-center text-center' onClick={navigateToList}>Xem danh sách </Button>
        </div>);
      case 'Xóa':
        return <h1 className='text-center text-5xl font-black'>Xóa</h1>;
      case 'Thống kê':
        return  <div className='flex-col  flex  md:w-full md:mt-5 mt-[70px] md:overflow-x-hidden overflow-x-scroll  items-center mb-5 snap-y snap-mandatory h-screen overflow-scroll  '>
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
          <div className='snap-center flex justify-center container  items-center px-10 flex-col w-full  h-screen'>
        <h1  className='text-3xl font-bold text-center '>Sơ đồ tổng số lượng bán theo từng sản phẩm</h1>
        <Thongkeluotbanproduct/>
        </div>
        </section>

        <section >
          <div className='snap-center container  flex justify-center mt-[20px]  items-center px-10 flex-col w-full  h-screen'>
        <h1 className='text-3xl font-bold text-center '>Sơ đồ tổng số lượng sản phẩm đang treo</h1>
        <ThongkehoanProduct/>
        </div>
        </section>


        <section >
          <div className='snap-center container  flex justify-center mt-[60px] items-center px-10 flex-col w-full  h-[100vh]'>
        <h1 className='text-3xl font-bold text-center '>Sơ đồ Sản phẩm có lượt tồn kho dưới 123 sản phẩm</h1>
        <Thongkestockproduct/>
        </div>
        </section>
      </div>;
      default:
        return <h1 className='text-center text-5xl font-black'>Danh sách</h1>;
    }
  };

  return (
    <LayoutAdmin>
      <div className='flex flex-row mt-[65px] w-full md:mt-0'>

        <div className={`min-h-screen flex-col flex ${menuVisible ? 'md:w-2/5 w-full' : 'w-[60px]'} transition-all duration-500`}>
          <NavabarPoduct
            menuVisible={menuVisible}
            setActiveMenuItem={setActiveMenuItem}
            toggleMenu={toggleMenu}
            subMenuVisible={subMenuVisible}
            toggleSubMenu={toggleSubMenu} />
        </div>
        <div className={`min-h-screen flex-col flex ${menuVisible ? 'w-0 md:w-4/5 hidden md:block' : 'w-full'} transition-all duration-500`}>
          {renderContent()}
        </div>

      </div>
    </LayoutAdmin>
  )
}

export default ProductMannager