import React, { useContext, useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { URL } from '../../url'
import axios from 'axios'
import { AuthContext } from '../../contexts/AuthContextProvider'
import { List, Modal, notification } from 'antd'
import Listorder from '../../component/Listorder'
import { formatCurrency, formattedTimestamp } from '../../untils'
import ParentComponent from '../../component/ParentComponent'
import { useNavigate } from 'react-router-dom'
import PayErorr from '../../component/PayErorr'
import OrderErorr from '../../component/OrderErorr'

function Order() {
  const navigate = useNavigate();
  const {userId,userToken } = useContext(AuthContext);
  const [list, setList] = useState([]);
  // const [orderId, setOrderId] = useState([]);
  const [order, setOrder] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const showModal = (id_order) => {
    setSelectedOrderId(id_order);
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
    setSelectedOrderId(null);
  };
// console.log(userId);
  const handleCancel = () => {
    setOpen(false);
    setSelectedOrderId(null);
  };
  const getOrders = async () => {
    try {
      const response = await axios.get(`${URL}api/v1/order/status/0/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,}
        }
      );
      // console.log("API Response:", response.data); 

      if (response.data.success) {
        setList(response.data.order);
        setOrder(response.data);
        // setOrderId(response.data.order.orderId);
        // console.log("ok", response.data);
      } else {
        // console.error('Error fetching orders:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching orders data:', error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [userToken,userId]);
  // console.log(list);
  const countItemsById = (id_product) => {
    let count = 0;
    list.forEach(item => {
      if (item.id_food === id_product) {
        count++;
      }
    });
    return count;
  };
  // console.log(selectedOrderId);
  function renderList(item, index) {
    // Check if this item is the first item with its id_order in the list
    // const isFirstItem = index === list.findIndex(cartItem => cartItem.id_order === item.id_order);


    // console.log(orderId);

    return (

      <div data-aos="fade-left" className='flex justify-center items-center w-full h-auto my-5 flex-col' key={item.id_item}>

        <div className="card">
          <div className="card-title">

            <button onClick={() => showModal(item.id_order)} class="relative
             overflow-hidden bg-gradient-to-r from-green-400 to-blue-500 text-white
             py-2 px-8 font-semibold rounded-3xl shadow-xl transform transition-a duration-500 hover:scale-110 hover:rotate-3 hover:skew-x-12">
              <span class="absolute top-0 left-0 w-full h-full bg-blue-300"></span>
              <span class="relative z-10">Chi tiết</span>
            </button>
            <br />
            Hóa đơn: ({item.id_order})<br />

            Thời gian:{formattedTimestamp(item.created_at)}
          </div>
          <div className={`card-subtitle`}>
            <p className={` ${item.notes ? 'text-red-500 font-black text-xl' : 'font-thin'}`}>{item.notes ? 'Có ghi chú' : 'Không có ghi chú'}</p> 
          </div>
          <hr className="card-divider" />
          <div className="card-footer">

            <div className="card-price">
              <span>



              </span>
              Tổng tiền :   {formatCurrency(item.total_price)}
            </div>
          </div>
        </div>

      </div>


    );
  }
  
  return (
 
    <Layout>
  {list.length > 0 ?(
    <div className='flex min-h-screen overflow-hidden w-full flex-col'>
    <h1 className='text-center font-bold text-3xl my-4'>Đơn Hành chờ thanh toán</h1>
        <List
          grid={{ gutter: 0, xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 4 }}
          dataSource={list}
          renderItem={renderList}
        />


        <Modal

          footer={<button
            onClick={() => {
                // payOrders(selectedOrderId);
                
               navigate(`/pays?orderId=${selectedOrderId}&userId=${userId}`);
               handleCancel();
               }}
            class="w-32 h-12 text-white font-semibold bg-gradient-to-r from-indigo-500
             via-purple-500 to-pink-500 rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl
              hover:shadow-[#7dd3fc] hover:cursor-pointer"
          >
            Xác nhận thanh toán
          </button>}
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          title={<div className='flex row justify-center items-center space-x-4'>

            <h1 calssName='text-center justify-center items-center'>Chi tiết đơn hàng {selectedOrderId}</h1>



            <ParentComponent selectedOrderId={selectedOrderId} />
          </div>}
          okButtonProps={{
            disabled: true,
            hidden: true,
          }}
          cancelButtonProps={{
            disabled: true,
            hidden: true,


          }}>
          <div className='h-[auto] justify-center items-center'>
            <Listorder selectedOrderId={selectedOrderId}  />
          </div>
        </Modal>

        
    </div>)
    :(
      <div className='flex min-h-screen overflow-hidden w-full flex-col'>
        <OrderErorr/>
      </div>
    )} 
    </Layout>
  )
}

export default Order