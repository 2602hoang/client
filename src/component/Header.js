import React, { useContext, useEffect, useState } from 'react'
import background from '../assets/background.png'
import { BookFilled, CaretDownOutlined, CaretUpOutlined, CloseCircleFilled, ContactsFilled, HomeFilled, HomeOutlined, MenuOutlined, UserOutlined, } from '@ant-design/icons';
import { AuthContext } from '../contexts/AuthContextProvider.js';
import { useNavigate } from 'react-router-dom';



import { DeleteFilled, ShoppingCartOutlined, } from '@ant-design/icons';

import { Avatar, Badge, FloatButton, Image, List, Modal, notification, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { formatCurrency } from '../untils/index.js';
import { URL } from '../url/index.js';
import axios from 'axios';



function Header({ cart }) {
  const { removeFromCart, clearCart, addToCart, userId,userToken,Logout } = useContext(AuthContext);
   
   const nav = useNavigate();
  const [notes, setNotes] = useState('');
  const [user,setUser] = useState({});

  const getoneUser = async () => {
    try {
      const id_user = userId;
      const response = await axios.get(`${URL}api/v1/user/getone/${id_user}`,
      {headers: {"Authorization": `Bearer ${userToken}`}},
      );
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser({});
    }
  };
  useEffect(() => {
    getoneUser();
  }, [userId,userToken]);

  

  // const { userToken,  } = useContext(AuthContext);


  const createOrders = async () => {
    const orderItemsMap = new Map();


    cart.forEach(product => {
      const id_product = product.id_product;
      const qty = countItemsById(id_product);

      if (orderItemsMap.has(id_product)) {
        orderItemsMap.set(id_product, qty);
      } else {
        orderItemsMap.set(id_product, qty);
      }
    });

    const orderItems = Array.from(orderItemsMap, ([id_product, qty]) => ({
      id_product,
      qty
    }));
    const id_pay = 7;
    const id_adress = 4;
    

    const orderData = {
      id_user: userId,
      id_pay: id_pay,
      id_adress: id_adress,
      notes: notes,
      status: 0,
      date_order: new Date().toISOString(),
      orderItems,
    };

    try {
       await axios.post(`${URL}api/v1/order/add`, orderData, {
        headers: {
          'Content-Type': 'application/json'
        }

      });
      // console.log(respone.data);
      clearCart();
      nav("/order");
      // nav('/order');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.stock  ) {
        const { stock } = error.response.data;
        notification.error({
          message: 'Đã xảy ra lỗi!',
          description: `Số lượng đặt vượt quá số lượng hiện có là ${stock}. Vui lòng điều chỉnh lại số lượng đặt`
        });
      } else {
        notification.error({
          message: 'Đã xảy ra lỗi!',
          description: 'Có lỗi xảy ra khi thực hiện đặt hàng. Vui lòng thử lại sau.'
        });
      }
      
    }
  }
  const countItemsById = (id_product) => {
    let count = 0;
    cart.forEach(item => {
      if (item.id_product === id_product) {
        count++;
      }
    });
    return count;
  };


  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
 

  function renderItem(product, index) {
    const showName = index === cart.findIndex(cartItem => cartItem.id_product === product.id_product);

    return (

      <List.Item

        style={{ display: showName ? 'block' : 'none' }}>
        <List.Item.Meta

          avatar={<Image src={product.images} width={100} height={100} />}
          title={
            <div className=' flex justify-between items-start h-min-screen h-auto'>
              <div className='flex flex-col justify-start items-start h-auto'>
                <h1 className='text-red-700 font-mono font-bold text-start mb-5 '> {showName ? product.name : null}</h1>

                <div className='flex flex-row space-x-4 justify-start items-start mr-auto w-full '>
                  {/* <Button onClick={() => { removeFromCart(item)}} icon={<MinusCircleFilled />} type='link' /> */}

                  <button
                    onClick={() => { removeFromCart(product) }}
                    title="Add New"
                    class="group cursor-pointer outline-none hover:rotate-90 duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg"
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                      class="stroke-green-400 fill-none group-hover:fill-green-800 group-active:stroke-green-200
                                        group-active:fill-green-600 group-active:duration-0 duration-300"
                    >
                      <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke-width="1.5"
                      />
                      <path d="M8 12H16" stroke-width="1.5"></path>
                    </svg>

                  </button>


                          <input
                  // type="number"
                 
                  name="qty"
                  value={`SL: ${countItemsById(product.id_product)}`}
                  className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 
                  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />
                  {/* <h1 className='border-b-2  font-mono text-black '>SL: </h1> */}

                  <button
                    onClick={() => addToCart(product)}
                    title="Add New"
                    class="group cursor-pointer outline-none hover:rotate-90 duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                      class="stroke-green-400 fill-none group-hover:fill-green-800 group-active:stroke-green-200
                                           group-active:fill-green-600 group-active:duration-0 duration-300"
                    >
                      <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke-width="1.5"
                      ></path>
                      <path d="M8 12H16" stroke-width="1.5"></path>
                      <path d="M12 16V8" stroke-width="1.5"></path>
                    </svg>
                  </button>

                </div>

              </div>
              <div className='flex  flex-col space-y-9 justify-end items-end '>
                <h1 className='text-black font-mono '>
                  Đơn Giá : {formatCurrency(product.price)}
                </h1>
                {/* <CloseOutlined /> */}

                <h1 className='font-mono text-black mt-24'>TT: {formatCurrency(countItemsById(product.id_product) * product.price)}</h1>


              </div>

            </div>
          }
          description={
            <div className='flex justify-end items-end'>

            </div>
          }
        />

      </List.Item>

    );
  };



  const handlelogout = async () => {
    await Logout()
    window.location.reload(false);
  }

  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const [subMenuVisible, setSubMenuVisible] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuVisible(!subMenuVisible);
  };
  const [subMenuVisible1, setSubMenuVisible1] = useState(false);

  const toggleSubMenu1 = () => {
    setSubMenuVisible1(!subMenuVisible1);
  };
  const closeSubMenu1 = () => {
    setSubMenuVisible1(false);
  };



  return (
    <div className=' justify-center flex fixed md:relative  items-center font-mono
                 flex-row bg-[#539ba9]  h-[60px] md:w-full z-40 w-full top-0 '>

      <nav className=' justify-between items-center py-2 flex   w-full mx-2'>
        <div className='md:flex top-0 left-0 right-0  z-50  md:z-50   md:w-1/5 flex flex-row md:mr-auto '>
          <a href='/' className='font-black flex  items-center font-sans gap-x-2 md:ml-20 bg-clip-text text-transparent 
          bg-gradient-to-r from-red-700 to-yellow-400'>
            <Image src={background} className=' space-x-1 h-12 w-12 rounded-full' width={50} height={50} />
            User<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 16.74V4.67c0-1.2-.98-2.09-2.17-1.99h-.06c-2.1.18-5.29 1.25-7.07 2.37l-.17.11c-.29.18-.77.18-1.06 0l-.25-.15C9.44 3.9 6.26 2.84 4.16 2.67 2.97 2.57 2 3.47 2 4.66v12.08c0 .96.78 1.86 1.74 1.98l.29.04c2.17.29 5.52 1.39 7.44 2.44l.04.02c.27.15.7.15.96 0 1.92-1.06 5.28-2.17 7.46-2.46l.33-.04c.96-.12 1.74-1.02 1.74-1.98ZM12 5.49v15M7.75 8.49H5.5M8.5 11.49h-3" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </a>
        </div>

        <ul id="menu" className={`
                   py-4  
            md:w-3/5 w-full
            md:space-y-0
              space-y-4
               bg-sky-300
                fixed z-20 top-0 left-0  h-full flex font-bold flex-col justify-center
                 items-center  ${menuVisible ? 'min-h-full' : 'invisible'
          } md:visible
           md:bg-transparent md:h-auto md:flex-row md:justify-between md:items-center md:relative md:mx-5 md:mr-52
                    }`}>
          <li className='relative md:m-0'>
            <a href='/home' className=' text-white hover:border-b-2 hover:animate-ping
                         hover:border-red-500 hover:text-red-500
                          transition duration-500 ease-in'>Trang Chủ <HomeFilled style={{ fontSize: '15px' }} /></a>
          </li>


          <li className=' md:m-0'>
            <a href='/product' className=' text-white hover:border-b-2 hover:animate-ping
                         hover:border-red-500 hover:text-red-500
                          transition duration-500 ease-in'>Sản phẩm 
                          <BookFilled style={{ fontSize: '15px' }} /></a>
          </li>
          
          <li className=' md:m-0 relative text-center'>
            <a onClick={toggleSubMenu} className='text-white hover:border-b-2 hover:border-red-500 hover:text-red-500 justify-center transition duration-500 ease-in'>Đơn Hàng {subMenuVisible ? <CloseCircleFilled style={{ fontSize: '15px' }} /> : <CaretDownOutlined style={{ fontSize: '15px' }} />}  </a>
            <ul className={`md:absolute relative md:text-start text-center ${subMenuVisible ? 'mt-3 opacity-80  rounded-br-xl rounded-bl-xl' : 'hidden'}`}>
              <div className='md:w-[200px] flex flex-col rounded-br-lg rounded-bl-lg space-y-4 mt-2 w-full p-2 md:bg-[#539ba9] bg-sky-300 text-white  '>
                <li>
                  <a
                    href='/order'
                  >Đơn chưa xác nhận TT</a>
                </li>

                <li>
                  <a href='/orderlist'>Đơn đã xác Nhận TT</a>
                </li>

                <li>
                  <a href='/orderbyme'>Tất cả đơn</a>
                </li>
              </div>
            </ul>
          </li>


          <li className=' md:m-0 '>
            <a href='/contact' className=' text-white hover:border-b-2 hover:animate-ping text-center
                         hover:border-red-500 hover:text-red-500
                          transition duration-500 ease-in'>Về chúng tôi <ContactsFilled style={{ fontSize: '15px' }} />

            </a></li>
          <li className=' md:m-0 relative text-center'   >
            <a onClick={toggleSubMenu1} className='text-white   hover:text-red-500 justify-center transition duration-500 ease-in'>
              <Avatar
               src={user.avatar} 
              className='' />
              {subMenuVisible1 ? <CloseCircleFilled style={{ fontSize: '15px', color: 'white' }} /> : <CaretDownOutlined style={{ fontSize: '15px', color: 'white' }} />}
            </a>
            <ul className={`md:absolute relative md:text-start text-center justify-center items-center  ${subMenuVisible1 ? 'mt-3 opacity-80  rounded-br-xl rounded-bl-xl' : 'hidden'}`}>
              <div className={` w-full md:w-[200px] flex flex-col space-y-4 rounded-br-lg rounded-bl-lg mt-1 p-2 mr-[200px] md:bg-[#539ba9] bg-sky-300 text-white text-center`}>
                <li className='my-5 md:m-0 relative text-center' >
                  <a href={`/user?userId=${userId}`}> <UserOutlined />Thông tin cá nhân</a>
                </li>

                <li className='w-full flex justify-center items-center text-center'>
                  
                  <button
                    onClick={() => {
                      handlelogout();
                      nav("/");
                    }}
                    class="group flex items-center justify-center mx-20 md:mx-1 w-full h-8 bg-red-600 rounded-full cursor-pointer relative  overflow-hidden transition-all
                     duration-200 shadow-lg hover:w-full md:px-6 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                  >
                    <div
                      class="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
                    >
                      <svg class="w-4 h-4" viewBox="0 0 512 512" fill="white">
                        <path
                          d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                        ></path>
                      </svg>
                    </div>

                    <div
                      class="absolute transform translate-x-full opacity-0 text-white text-lg font-semibold hover:text-center ml-4
                       transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      Đăng xuất
                    </div>
                  </button>
                  

                </li>
              </div>
            </ul>
          </li>

          {/* <li className='my-5 md:m-0'>
         
            
            

          </li> */}




        </ul>

        <div id='menu-button' className='absolute  top-5 right-5  md:hidden cursor-pointer z-50 flexd' onClick={toggleMenu}>


          <MenuOutlined style={{ color: 'black', fontSize: "20px" }} />

        </div>

      </nav>
      <div>
        {cart.length > 0 ? (
          <FloatButton
            badge={{
              count: cart.length.toString(),
            }}
            onClick={showModal}
            style={{ color: '#black', height: 60, width: 60, right: 24, top: '50%', }}
            icon={<ShoppingCartOutlined />}



          />

        ) : <></>}







        <Modal title={<div className='flex  justify-center items-center gap-5 h-min-screen h-auto '>


          <ShoppingCartOutlined style={{ color: 'black', fontSize: "25px" }} /> Giỏ Hàng
        </div>}
          className='justify-center items-center   text-center  h-screen '
          width={window.innerWidth >= 768 ? "670px" : "100%"}
          // height={window.innerWidth >= 768 ? "min" : "100%"}

          open={open}
          onOk={handleOk}
          onCancel={handleCancel}

          okButtonProps={{
            disabled: true,
            hidden: true,
          }}
          cancelButtonProps={{
            disabled: true,
            hidden: true,


          }}>

          <List
            className='  border-2 p-2 border-black border-dashed rounded-2xl h-auto w-[full] overflow-hidden h-min-screen'
            header={<div className=' flex justify-start items-start hover:animate-bounce '>
              <Tooltip title="Xóa giỏ hàng" trigger={"hover"}>
                <DeleteFilled onClick={() => clearCart()} style={{ color: 'red', fontSize: "20px" }} />
              </Tooltip>
            </div>}
            footer=
            {


              <div classsName='w-full flex-row  '>
                {cart.length > 0 ?
                  <div className='md:w-2/3 justify-end items-end  ml-auto'>
                    <TextArea
                    
                      className='w-full justify-start items-start mr-5'
                      placeholder="Ghi chú"
                      autoSize={{
                        minRows: 3,
                        maxRows: 5,
                      }}
                      value={notes}
                      onChange={notes => setNotes(notes.target.value)}
                    />
                  </div> : <></>}

                <div className=' flex-col md:w-1/3 justify-end items-end ml-auto flex'>
                  {cart.reduce((total, item) => total + item.price, 0) > 0 ? (
                    <h1 className='justify-end items-end text-black font-bold text-end'> Tổng tiền hóa đơn: {formatCurrency(cart.reduce((total, item) => total + item.price, 0))}</h1>
                  ) : (
                    <h1></h1>
                  )}
                  {cart.length > 0 ? (

                    <button
                      onClick={() => {
                        createOrders();
                       
                      }}
                      class="flex animate-bounce mt-5 hover:animate-none items-center px-4 py-2 bg-gradient-to-r 
                 from-blue-500 via-blue-600 to-blue-500 text-white font-extrabold text-lg rounded-full
                  shadow-2xl hover:from-blue-600 hover:via-blue-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-70 active:bg-blue-800 active:shadow-inner transform hover:scale-110 transition duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ml-4"
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clip-rule="evenodd" />
                      </svg>

                      Đặt hàng
                    </button>


                  ) :
                    <h1></h1>}
                </div>


              </div>





            }

            itemLayout="horizontal"
            dataSource={cart}
            renderItem={renderItem}

          />
        </Modal>
      </div>




    </div>
  )
}

export default Header