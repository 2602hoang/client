import React, { useContext, useEffect, useState } from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'

import { Button, Input, Menu, Select, Space } from 'antd';
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, ExportOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined } from '@ant-design/icons';

import NavabarPoduct from '../../component/NavabarPoduct';
import ListProduct from '../../component/ListProduct';
import AddProduct from '../../component/AddProduct';
import axios from 'axios';
import { URL } from '../../url';
import Search from 'antd/es/transfer/search';
import { AuthContext } from '../../contexts/AuthContextProvider';

function ProductMannager() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [subMenuVisible, setSubMenuVisible] = useState({});
  const [activeMenuItem, setActiveMenuItem] = useState('Danh sách');
  const {userToken} = useContext(AuthContext);
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
      const response = await axios.get(`${URL}api/v1/category/getall`);
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
  const renderContent = () => {
    switch (activeMenuItem) {
      case 'Danh sách':
        return (<div className='text-center text-4xl w-full font-black'>
          <h1 className='my-4'>Danh sách Sản Phẩm</h1>
          <div className='w-full'>


            <ListProduct categories={categories} brands={brands} getCategories={getCategories} getBrands={getBrands} />
          </div>
        </div>);
      case 'Chỉnh sửa':
        return <h1 className='text-center text-5xl font-black'>Chỉnh sửa</h1>;
      case 'Thêm':
        return (<div className='text-center justify-center items-center  flex-col flex text-5xl font-black w-full space-y-4 mb-4'>
          <h1 className='mb-8'>Thêm  Sản Phẩm</h1>
          <AddProduct categories={categories} brands={brands} getCategories={getCategories} getBrands={getBrands} navigateToList={navigateToList} />
          <Button type="link" icon={<ExportOutlined style={{ fontSize: '24px' }} />} className='h-12 bg-orange-300 w-1/12  justify-center items-center text-center' onClick={navigateToList}>Xem danh sách </Button>
        </div>);
      case 'Xóa':
        return <h1 className='text-center text-5xl font-black'>Xóa</h1>;
      case 'Thống kê':
        return <h1 className='text-center text-5xl font-black'>Thống kê</h1>;
      default:
        return <h1 className='text-center text-5xl font-black'>Danh sách</h1>;
    }
  };

  return (
    <LayoutAdmin>
      <div className='flex flex-row mt-[65px] w-full md:mt-0'>

        <div className={`min-h-screen flex-col flex ${menuVisible ? 'md:w-1/5 w-2/3' : 'w-[60px]'} transition-all duration-500`}>
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