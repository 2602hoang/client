import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextProvider';
import { MenuOutlined } from '@ant-design/icons';
import { Avatar, Button, FloatButton } from 'antd';
import LayoutNavabar from '../page/layout/LayoutNavabar';
function NavabarPoduct({menuVisible, toggleMenu, subMenuVisible, 
  toggleSubMenu,setActiveMenuItem }) {
    const productMenuItems = [
        {
          title: 'Danh sách',
          // subItems: ['Quần', 'Áo', 'Giầy']
        },
        // { title: 'Chỉnh sửa' },
        { title: 'Thêm' ,
          // subItems: ['Quần', 'Áo', 'Giầy']
        },
        // { title: 'Xóa' },
        { title: 'Thống kê',
          // subItems: ['Lượt Bán', 'Tồn Kho']
         },
      ];
      const handleMenuClick = (item) => {
        setActiveMenuItem(item.title);
    };
  return (
    <LayoutNavabar
    menuItems={productMenuItems} 
    userName="User" 
    menuVisible={menuVisible} 
    toggleMenu={toggleMenu} 
    subMenuVisible={subMenuVisible} 
    toggleSubMenu={toggleSubMenu} 
    onMenuClick={handleMenuClick} 
      />

  )
}

export default NavabarPoduct