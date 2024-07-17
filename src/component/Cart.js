import React, { useContext, useState } from 'react'

import { DeleteFilled, ShoppingCartOutlined, } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Avatar, Badge, FloatButton, Image, List, Modal, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { formatCurrency } from '../untils/index.js'; 
import { AuthContext } from '../contexts/AuthContextProvider.js';
import { URL } from '../url/index.js';
import axios from 'axios';
import { useCart } from '../contexts/CartProvider.js';




function Cart({cart}) {
    const { removeFromCart, clearCart, addToCart  } = useCart();

    const [notes, setNotes] = useState('');
    // const [orderDate, setOrderDate] = useState('');
    const { userToken, userId } = useContext(AuthContext);
    const nav = useNavigate();
    // console.log(cart);
  
    const createOrders = async () => {
      const orderItemsMap = new Map();
  
      // Populate orderItemsMap with unique id_product and sum their quantities
      cart.forEach(product => {
        const id_product = product.id_product;
        const qty = countItemsById(id_product);
  
        if (orderItemsMap.has(id_product)) {
          orderItemsMap.set(id_product, qty);
        } else {
          orderItemsMap.set(id_product, qty);
        }
      });
  
      // Convert orderItemsMap back to an array of objects
      const orderItems = Array.from(orderItemsMap, ([id_product, qty]) => ({
        id_product,
        qty
      }));
      console.log("ok", orderItems);
      // Convert orderItemsMap back to an array of objects
  
      const orderData = {
        id_user: userId,
        note: notes,
        status: 0,
        order_date: new Date().toISOString(),
        orderItems,
      };
      try {
        const respone = await axios.post(`${URL}api/v1/order/add`, orderData, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
  
        });
        console.log(respone.data);
        clearCart();
        // nav('/order');
      } catch (error) {
        console.log(error);
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
  
  
  
                    <h1 className='border-b-2  font-mono text-black '>SL: {countItemsById(product.id_product)}</h1>
  
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
  return (
    <div>
       
    </div>
  )
}

export default Cart