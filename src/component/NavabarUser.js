import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextProvider';
import { MenuOutlined } from '@ant-design/icons';
import { Avatar, Button, FloatButton } from 'antd';
import LayoutNavabar from '../page/layout/LayoutNavabar';

function NavabarUser({menuVisible, setActiveMenuItem,toggleMenu,
   subMenuVisible, toggleSubMenu}) {
    
    const userMenuItems = [
        {
          title: 'Danh sách',
          subItems: ['Khách Hàng', 'Nhân viên', 'Quản lý']
        },
        // { title: 'Sửa' },
        { title: 'Thêm' },
        // { title: 'Xóa' },
        { title: 'Thống kê',
          subItems: ['Lượng bán', 'Lần đặt', ]
         },
      ];
      const handleMenuClick = (item) => {
        setActiveMenuItem(item.title);
    };

    return (
        <LayoutNavabar
         onMenuClick={handleMenuClick}
         menuItems={userMenuItems}
          userName="User" 
          menuVisible={menuVisible}
           toggleMenu={toggleMenu}
            subMenuVisible={subMenuVisible} 
            toggleSubMenu={toggleSubMenu}  />
    );
}

export default NavabarUser;
