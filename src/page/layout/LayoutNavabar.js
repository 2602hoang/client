import React, { useState } from 'react';
import { Button, Avatar, FloatButton } from 'antd';

function LayoutNavabar({ menuItems, userName, menuVisible, toggleMenu, subMenuVisible,
  toggleSubMenu, onMenuClick }) {
  // const [menuVisible, setMenuVisible] = useState(false);
  // const [subMenuVisible, setSubMenuVisible] = useState({});

  // const toggleMenu = () => {
  //   setMenuVisible(!menuVisible);
  // };

  // const toggleSubMenu = (index) => {
  //   setSubMenuVisible((prevState) => ({
  //     ...prevState,
  //     [index]: !prevState[index],
  //   }));
  // };
  return (
    <div className={`overflow-hidden ${menuVisible ? 'border-r-2' : 'border-r-0'} w-full 
    justify-start items-start flex flex-col`}>
     
      <Button
        type='link'
        className='flex my-2 mt-[10px] md:ml-3 md:fixed absolute mr-2 '
        onClick={toggleMenu}
        icon={
          !menuVisible ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none">
              <path fill="#2ccce4" d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2zm-1.4 10.53l-3.53 3.53c-.15.15-.34.22-.53.22s-.38-.07-.53-.22a.754.754 0 010-1.06l3-3-3-3a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l3.53 3.53c.3.29.3.77 0 1.06z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none">
              <path fill="#2ccce4" d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2zm-2.4 13c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22s-.38-.07-.53-.22L9.2 12.53a.754.754 0 010-1.06l3.53-3.53c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-3 3 3 3z"></path>
            </svg>
          )
        }
      />
    
      <nav className={`overflow-hidden justify-center   items-center  font-mono text-3xl mt-5  flex h-screen w-full transition-all duration-500 ease-in-out ${menuVisible ? ' block' : 'hidden'}`}>
        <ul id='menu' className='space-y-20 mt-5 '>
          {menuItems.map((menuItem, index) => (
            <li key={index} className='my-5  md:m-0'>
              <a
                onClick={() => {
                  toggleSubMenu(index);
                  onMenuClick(menuItem);
                  toggleMenu();
                }}
                className={`text-black hover:border-b-2
                  
                 hover:border-red-500  hover:text-red-500 font-bold transition duration-500 ease-in $`
                 }>
                {menuItem.title}
              </a>
              {/* {menuItem.subItems && (
                <ul className={`ml-5 mt-2 space-y-3 ${subMenuVisible[index] ? 'block' : 'hidden'}`}>
                  {menuItem.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a className='text-black hover:border-b-2 text-xl
                    hover:animate-ping hover:border-red-500 hover:text-red-500 transition duration-500 ease-in'>
                        {subItem}
                      </a>
                    </li>
                  ))}
                </ul>
              )} */}
            </li>
          ))}
          <li className='my-5 md:m-0 flex-col flex'>
            <Avatar className='h-20 w-20'/>
            {userName}
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default LayoutNavabar