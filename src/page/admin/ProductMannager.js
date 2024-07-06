import React, { useState } from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'

import { Button, Menu } from 'antd';
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined } from '@ant-design/icons';

import NavabarPoduct from '../../component/NavabarPoduct';
import ListProduct from '../../component/ListProduct';
import AddProduct from '../../component/AddProduct';
import axios from 'axios';
import { URL } from '../../url';

function ProductMannager() {
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
        const response = await axios.get(`${URL}api/v1/brand/getall`);
        setBrands(response.data);
    } catch (error) {
        console.error('Error fetching brands:', error);
    }
};


  const renderContent = () => {
    switch (activeMenuItem) {
      case 'Danh sách':
        return (<div className='text-center text-5xl w-full font-black'>
          <h1>Danh sách Sản Phẩm</h1>
          <h1>adasdsa</h1>
            <ListProduct categories={categories} brands={brands} getCategories={getCategories} getBrands={getBrands} />

        </div>);
      case 'Chỉnh sửa':
        return <h1 className='text-center text-5xl font-black'>Chỉnh sửa</h1>;
      case 'Thêm':
        return (<div className='text-center  flex-col flex text-5xl font-black w-full space-y-8'>
          <h1 className=''>Thêm  Sản Phẩm</h1>
            <AddProduct categories={categories} brands={brands} getCategories={getCategories} getBrands={getBrands} navigateToList={navigateToList}/>

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