import React from 'react'
import LayoutNavabar from '../page/layout/LayoutNavabar';

function NavabarOrder({menuVisible, toggleMenu, subMenuVisible, toggleSubMenu,setActiveMenuItem}) {
    const orderMenuItems = [
        {
          title: 'Danh sách',
          subItems: ['Đơn đang giao', 'Đơn đã giao', 'Đơn hủy']
        },
        { title: 'Ghi chú', subItems: ['Đơn đang giao', 'Đơn hủy']},
        // { title: 'Thêm' },
        // { title: 'Xóa' },
        { title: 'Thống kê',
          subItems: ['Tổng đơn thành công','Tổng đơn đang giao', 'Tổng đơn hủy']
         },
      ];
      const handleMenuClick = (item) => {
        setActiveMenuItem(item.title);
    };

  return (
    <LayoutNavabar 
    onMenuClick={handleMenuClick} 
    menuItems={orderMenuItems} 
    userName="User"
     menuVisible={menuVisible}
     toggleMenu={toggleMenu} 
     subMenuVisible={subMenuVisible}
      toggleSubMenu={toggleSubMenu}  />

  )
}

export default NavabarOrder