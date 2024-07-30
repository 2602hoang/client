import React, { useContext, useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { useNavigate } from 'react-router-dom';
import { URL } from '../../url';
import axios from 'axios';
import { Button, Form, message, Modal, notification, Popconfirm, Space, Tag, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';
import ParentComponent from '../../component/ParentComponent';
import { formatCurrency, formattedTimestamp } from '../../untils';
import TextArea from 'antd/es/input/TextArea';
import { AuthContext } from '../../contexts/AuthContextProvider';

function ListOrder() {
  const nav = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);

  const [open, setOpen] = useState(false);
  const [activeTag, setActiveTag] = useState('all');

  const {userId,userToken} = useContext(AuthContext);
  const showModal = async (id_order) => {
    setSelectedOrderId(id_order);
    setOpen(true);
    try {
      const response = await axios.get(`${URL}api/v1/order/getonebyOrderId/${id_order}`);
      setSelectedOrderDetails(response.data.order);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOk = () => {
    setOpen(false);
    setSelectedOrderId(null);
    setSelectedOrderDetails([]);
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedOrderId(null);
    setSelectedOrderDetails([]);
  };

 

  const getOrders = async () => {
    try {
      const response = await axios.get(`${URL}api/v1/order/getone1/status1/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          },
        }

      );
      const ordersWithKeys = response.data.order.map((order, index) => ({
        ...order,
        key: index + 1,
      }));
      setOrders(ordersWithKeys);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    getOrders(); // Call getOrders initially and whenever id_pay changes
  }, [userToken,userId]);

  useEffect(() => {
    let filtered = orders;
    if (activeTag === 'confirmed') {
      filtered = orders.filter(order => order.id_pay === 2 && order.finished === 0);
    } else if (activeTag === 'notConfirmed') {
      filtered = orders.filter(order =>  order.id_pay === 5 && order.finished === 0);
    } else if (searchTerm) {
      filtered = orders.filter(order => order.id_order.toString().includes(searchTerm)  );
    }
    setFilteredOrders(filtered);
  }, [orders, activeTag, searchTerm,]);

  const countItemsByIdSP = (selectedOrderDetails) => {
    const countMap = {};
    selectedOrderDetails?.forEach((orderItem) => {
      if (orderItem.order_details && Array.isArray(orderItem.order_details)) {
        orderItem.order_details.forEach(detail => {
          if (detail.id_product) {
            if (countMap[detail.id_product]) {
              countMap[detail.id_product].count += detail.qty;
              countMap[detail.id_product].total_amount += detail.total_amount;
            } else {
              countMap[detail.id_product] = {
                count: detail.qty,
                total_amount: detail.total_amount,
                name: detail.product.name,
                price: detail.total_amount / detail.qty,
                images: detail.product.images
              };
            }
          }
        });
      }
    });
    return countMap;
  };





  const prodcut = countItemsByIdSP(selectedOrderDetails);

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    notification.success({
      message: `Danh sách đơn hàng ${tag === 'confirmed' ? 'đã xác nhận' : tag === 'notConfirmed' ? 'Đơn hủy' : 'tất cả'}`,
      showProgress: true,
      duration: 1.5,
    });
  };

  return (
    <Layout>
      <h1 data-aos="fade-down" className='text-3xl font-bold mt-[70px] text-center'>Các Đơn Hàng Đã Xác Nhận Thanh Toán</h1>
      {filteredOrders.length >0 ?(
      <div data-aos="fade-down" className='flex flex-col w-full h-auto min-h-screen my-9 md:px-8'>
    <div data-aos="fade-down" className='flex flex-col md:w-full justify-center items-center my-4'>
      <ul className='[&:hover>li]:opacity-10 w-full md:flex flex-col md:flex-row md:space-x-7 my-2 justify-center items-center gap-3'>
        <div className='flex flex-row justify-center items-center space-x-3'>
          <li className='hover:!opacity-100 flex'>
            <Tag
              color={activeTag === 'all' ? "blue" : "default"}
              onClick={() => handleTagClick('all')}
              className="cursor-pointer text-xl"
            >
              Tất Cả Đơn
            </Tag>
          </li>
          <li className='flex hover:!opacity-100'>
            <Tag
              color={activeTag === 'confirmed' ? "green" : "default"}
              onClick={() => handleTagClick('confirmed')}
              className="cursor-pointer text-xl"
            >
              Đơn Đã Xác Nhận
            </Tag>
          </li>
          <li className='hover:!opacity-100 flex'>
            <Tag
              color={activeTag === 'notConfirmed' ? "red" : "default"}
              onClick={() => handleTagClick('notConfirmed')}
              className="cursor-pointer text-xl"
            >
              Đơn Hủy
            </Tag>
          </li>
        </div>
      </ul>
    </div>

    <div data-aos="fade-down" className='flex flex-col justify-center items-center md:w-full'>
      <div className='flex flex-col w-11/12 md:w-1/3 mb-2 justify-center items-center'>
        <Search
          placeholder="Tìm theo ID đơn hàng"
          className="w-full"
          onChange={e => setSearchTerm(e.target.value)}
          enterButton
        />
      </div>
      
      <div className='flex justify-center flex-col items-center md:w-full w-11/12 overflow-x-scroll md:overflow-x-hidden pl-[240px] md:pl-0'>
        <table className="table-auto md:min-w-full min-w-12 border-separate font-mono border border-slate-400">
          <thead>
            <tr className='text-center text-2xl uppercase font-bold'>
              <th className='border border-slate-300'>STT</th>
              <th className='border border-slate-300'>ID đơn</th>
              <th className='border border-slate-300'>SDT người đặt</th>
              <th className='border border-slate-300'>Ngày đặt</th>
              <th className='border border-slate-300'>Trạng Thái</th>
              <th className='border border-slate-300'>Tổng thanh toán</th>
              <th className='border border-slate-300'>Hành động</th>
            </tr>
          </thead>
          <tbody className='text-center text-xl'>
            {filteredOrders.map((order, index) => (
              <tr key={order.id_order} className='capitalize'>
                <td className='border border-slate-300'>{index + 1}</td>
                <td className='border border-slate-300'>{order.id_order}</td>
                <td className='border border-slate-300'>{order.user.phone}</td>
                <td className='border border-slate-300'>{formattedTimestamp(order.date_order)}</td>
                <td className='border border-slate-300'>
                  <Tooltip title={order.id_pay === 1 ? "Đơn chờ shop xác nhận" : order.id_pay === 2 ? "Đơn shop đã xác nhận" : "Đơn hủy"}>
                  <Tag color={order.id_pay === 1 ?'#fdc323' : order.id_pay === 2 ? "#7ae284" : "#FF0000"} className='uppercase '>
                    {order.id_pay === 1 ? "Chờ xác nhận" : order.id_pay === 2 ? "Đơn đã xác nhận" : "Đơn hủy"}
                  </Tag>
                  </Tooltip>
                </td>
                <td className='border border-slate-300'>{formatCurrency(order.total_price)}</td>
                <td className='border border-slate-300'>
                  <Space className='flex justify-center items-center py-3 md:flex-row md:flex flex-col' size="middle">
                    <Tooltip title="Xem chi tiết đơn hàng">
                      <Button className='w-full bg-slate-400 text-black hover:text-white uppercase' onClick={() => showModal(order.id_order)}>Xem Đơn</Button>
                    </Tooltip>
                    {/* <Tooltip title="Thêm ghi chú cho đơn hàng">
                      <Button className='w-full bg-slate-400 text-black hover:text-white uppercase' onClick={() => showModal1(order.id_order)}>Ghi chú</Button>
                    </Tooltip> */}
           
                  </Space>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>

    {/* Order Details Modal */}
    <Modal
      title={<div className='flex row justify-start items-start space-x-4 '>

        <h1 calssName='text-start justify-start items-start'>Chi tiết đơn hàng {selectedOrderId}</h1>



        <ParentComponent selectedOrderId={selectedOrderId} />
      </div>}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1200}
    >
      {selectedOrderDetails?.map(orderDetail => (
        <div id="pdf-content" key={orderDetail.id_order}
         className={`overflow-x-scroll p-4 mb-4 border-2 ${orderDetail.id_pay === 1 ? 'border-yellow-500' : orderDetail.id_pay === 2 ? "border-green-500" : "border-red-500"}`}>
          <p className={`${orderDetail.id_pay === 1 ? 'text-yellow-500' : orderDetail.id_pay === 2 ? "text-green-500" : "text-red-500"}`}><strong>Trạng thái đơn:</strong> {orderDetail.id_pay ===1 ? 'chờ xác nhận': orderDetail.id_pay === 2 ? "Đơn đã xác nhận" : "Đơn Hủy"}</p>
          <p><strong>ID đơn</strong> {orderDetail.id_order}</p>
          <p><strong>Ngày đặt:</strong> {formattedTimestamp(orderDetail.date_order)}</p>
          <p><strong>Người đặt:</strong> {orderDetail.user.phone}</p>
          <p><strong>Ghi chú:</strong> {orderDetail.notes ? orderDetail.notes : "Không có ghi chú"}</p>
          <p><strong>Tổng thanh toán:</strong> {formatCurrency(orderDetail.total_price)}</p>
          <br/>
         
          {orderDetail.id_pay === 5 ?
          <p className='text-red-500'><strong> Lý do hủy: {orderDetail.note_pays.length > 0 ? `${orderDetail.note_pays}` : "Giao dịch thất bại"} </strong></p>
         :<></>}
          <br/>
          <table className="w-full mt-4 border">
            <thead>
              <tr>
                <th className="border px-4 py-2">STT</th>
                <th className="border px-4 py-2">Sản phẩm</th>
                <th className="border px-4 py-2">Giá</th>
                <th className="border px-4 py-2">Số lượng</th>
                <th className="border px-4 py-2">Tổng</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {Object.keys(prodcut).map((id_product, index) => (
                <tr key={id_product}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2 flex flex-row justify-center items-center space-x-2">
                    <img src={prodcut[id_product].images}  alt={prodcut[id_product].name} className="w-16 h-16 object-cover" />
                    <span>{prodcut[id_product].name}</span>
                  </td>
                  <td className="border px-4 py-2">{formatCurrency(prodcut[id_product].price)}</td>
                  <td className="border px-4 py-2">{prodcut[id_product].count}</td>
                  <td className="border px-4 py-2">{formatCurrency(prodcut[id_product].total_amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </Modal>

    {/* Note Modal */}
   
      </div>
      ):
      (
        <div className='text-3xl text-center font-bold text-red-500 min-h-screen justify-center items-center mt-9'>Hiện tại không có đơn chờ xác nhận</div>
      )
      }
    </Layout>
  )
}

export default ListOrder