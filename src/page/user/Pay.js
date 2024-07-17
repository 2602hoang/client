import React, { useContext, useEffect, useState } from 'react';
import { DatePicker, Divider, Form, Input, notification, QRCode, Radio, Select, Steps } from 'antd';
import { CheckOutlined, CreditCardOutlined, DollarOutlined, FormOutlined, IdcardOutlined, MoneyCollectOutlined, RightCircleFilled, UserOutlined } from '@ant-design/icons';
import Layout from '../layout/Layout';

import TextArea from 'antd/es/input/TextArea';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthContextProvider';
import { URL } from '../../url';
import axios from 'axios';
import { formatCurrency, formattedTimestamp } from '../../untils';
import ParentComponent from '../../component/ParentComponent';
import PayErorr from '../../component/PayErorr.js';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import Erorr from '../../component/Erorr.js';
dayjs.locale('vi');

const dateFormat = 'DD/MM/YYYY';

function Pay() {
  const nav = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams()
  const orderId = searchParams.get('orderId');
  const userId = searchParams.get('userId');

  console.log(userId, orderId);
  const [check, setCheck] = useState('');
  
  const [orderpay, setOrderpay] = useState([]);
 
  const getOrderPay = async () => {
    if (userId ===null || orderId===null) {
      notification.warning({
        message: 'Thông báo',
        description: 'Hiện tại không có đơn hàng để xác nhận thanh toán',
      });
      return;
    }
    try {
      const response = await axios.get(`${URL}api/v1/order/getone/${userId}&${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,}
        }
      );

      setOrderpay(response.data.order);

      
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {

    getOrderPay();

  }, [orderId, userId]);
  console.table(orderpay.map(order => order.id_order));
  // const [value1, setValue1] = useState(0);

  const today = dayjs();
  
  
  const [current, setCurrent] = useState(0);
  const [value, setValue] = useState({
    option: 0,
    address: '',
    name: '',
    phone: '',
    date: today.format(dateFormat),
    note: '',
    // name1: '',
    // phone1: '',
    email: '',
    address1: '',
    note1: '',
  });

  const onChange1 = (e) => {
    // console.log('radio checked', e.target.value);
    setValue({ ...value, option: e.target.value });
  };
 
  {/* <Radio value={1}>Lấy hàng trực tiếp tại cửa hàng</Radio>
          <Radio value={2}>Lấy hàng qua đơn vị vận chuyển</Radio>
          <Radio value={3}>Thanh toán bằng ngân hàng <CreditCardOutlined /></Radio>
          <Radio value={4}>Thanh toán bằng tiền mặt <MoneyCollectOutlined /></Radio> */}
  // {
  //   console.log(check, value.option);
  // }
//   const getData = () => {
//     let data=8;

//     if (check === 1 && value.option === 3) {
//         data = 3;
//     } else if (check === 1 && value.option === 4) {
//         data = 1;
//     } else if (check === 2 && value.option === 3) {
//         data = 3;
//     } else if (check === 2 && value.option === 4) {
//         data = 1;
//     }

//     return data;
// };
// const data = getData();
  const getLocation = () =>{
    let loca = 4;
    if (value.address === "DC1") {
      loca = 2;
    } else if (value.address === "DC2") {
      loca = 1;
    }
    else if (value.address === "") {
      loca = 3;
    }
    return loca;
  }
  const loca = getLocation();
  {console.log(loca)}
  
  const payOrders = async () => {
    try {
      await axios.put(`${URL}api/v1/order/pay/${orderId}`,

        {
          id_pay : 1,
          id_adress : loca,
          status :1
        }
      );
      nav('/orderlist');
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.delete('orderId');
        newParams.delete('userId');
        return newParams;
      });
     
      notification.success({ message: 'Xác nhận thanh toán thành công' ,
        description: `Đã xác nhận thanh toán thành công và sang màn đơn hàng!`
      });
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };



  const handleChange = (field, val) => {
    if (field === 'address' && val !== '') {
      setValue({ ...value, [field]: val, address1: '' });
    } else if (field === 'address1' && val !== '') {
      setValue({ ...value, [field]: val, address: '' });
    } else {
      setValue({ ...value, [field]: val });
    }
    if (field === 'address' && (val === 'DC1' || val === 'DC2')) {
      setValue({ ...value, [field]: val, email: '' });
    }
  };

  const isStep1Valid = () => {
    if (value.option === 0) {
      return false;
    }
    if (value.option === 1) {
      return value.phone !== '' && value.name !== '' && value.address !== '';
    }
    if (value.option === 2) {
      return value.phone !== '' && value.name !== '' && value.email !== '' && value.address1 !== '';
    }
    return false;
  };

  

  const canProceedToNext = current === 0 && isStep1Valid();

  const onChange = (nextCurrent) => {
    if (current === 0 && !canProceedToNext) {
      notification.warning({
        message: 'Thông báo',
        description: 'Nhập đủ thông tin mới sang được bước tiếp theo',
      });

      return;
    }
    if (nextCurrent > current) {
      notification.success({
        message: `${nextCurrent === 0 ? 'Chọn phương thức lấy hàng' : nextCurrent === 1 ? 'Chọn hình thức thanh toán' : 'Xác nhận thanh toán'} `,
        description: `Sang bước ${nextCurrent + 1}`,
      });
    } else if (nextCurrent < current) {
      notification.success({
        message: `${nextCurrent === 0 ? 'Chọn phương thức lấy hàng' : nextCurrent === 1 ? 'Chọn hình thức thanh toán' : 'Xác nhận thanh toán'} `,
        description: `Quay lại bước ${nextCurrent + 1}`,
      });
    }
    setCurrent(nextCurrent);
  };


  // const itemCountsSP = countItemsByIdSP(orderpay);
  const defaultValue = `     
            (Thông Tin Của Bạn) 
            Tên người nhận: ${value.name ? ' ' + value.name : ''}
            ${value.email.length > 0 ? 'Email: ' + value.email : ''}${value.date !== '' ? 'Ngày Nhận: ' + value.date : ''}
            ${value.phone.length > 0 ? 'SDT: ' + value.phone : ''}
            Địa chỉ: ${value.address === 'DC1'
      ? 'xx đường Nguyễn Huệ, quận 1, tp. Hồ Chí Minh'
      : value.address === 'DC2'
        ? 'xx đường Hai Bà Trưng, quận Ba Đình, tp. Hà Nội'
        : value.address1
    }
            ${value.note !== '' ? 'Ghi chú: ' + value.note : 'Ghi chú: không có ghi chú'} `;
  // {console.table(itemCountsSP);}

  return (
    <Layout>
      {orderId !==null && userId !== null ? (
      <div className='w-full h-full font-mono md:px-14 px-4 min-h-screen'>

        <h1 className='text-center font-bold text-3xl md:mt-4 mt-16'>Tiến hành chọn phương thức nhận hàng và hình thức thanh toán</h1>
        <div className='w-full pt-5'>
          <Steps
            current={current}
            onChange={onChange}
            items={[
              {
                title: 'Trực tiếp / trực tuyến',
                subTitle: '',
                icon: <UserOutlined />,
                description: 'Chọn phương thức lấy hàng',
              },
              {
                title: 'Tiền mặt / ngân hàng',
                description: 'Chọn hình thức thanh toán',
                icon: <DollarOutlined />
              },
              {
                title: 'Hoàn thành giao dịch',
                description: 'Xác nhận thanh toán',
                icon: <CheckOutlined />,
              },
            ]}
          />
        </div>
        <Divider />
        <div className='flex w-full px-3 h-auto  mb-2'>
          {current === 0 &&
            <div className='w-full justify-center items-center space-y-5 '>
              <h1>Bước 1: Chọn phương thức nhận hàng</h1>
              <Radio.Group onChange={onChange1} value={value.option}>
                <Radio value={1}>Lấy hàng trực tiếp tại cửa hàng</Radio>
                <Radio value={2}>Lấy hàng qua đơn vị vận chuyển</Radio>
              </Radio.Group>
              {value.option === 1 && (<div data-aos="zoom-out"className='grid grid-cols-1 md:grid-cols-2 border-2 w-full h-auto justify-start space-y-5 font-mono '>

                <div className='grid grid-cols-1 w-full p-6'>
                  <p>(Lấy hàng trực tiếp tại cửa hàng)</p>
                  <div className='w-full flex flex-col space-y-2'>
                    <a className='flex -flex-row'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM12 8v5" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.995 16h.009" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg> Nhập thông tin người nhận</a>
                    <Form style={{ width: window.innerWidth >= 768 ? "100%" : "100%", minWidth: '200px' }}>
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: 'Hãy nhập tên!',
                          }
                        ]}
                      >
                        <Input
                          allowClear
                          placeholder={value.name.length > 0 ? value.name : 'Nhập tên'}
                          value={value.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: 'Hãy nhập số điện thoại',
                          },
                          {
                            pattern: /^0\d{9}$/,
                            message: 'Số điện thoại phải là số và đúng định dạng!',
                          },
                          {
                            max: 10,
                            message: 'Số điện thoại 10 số',
                          }
                        ]}
                      >
                        <Input
                          allowClear

                          placeholder={value.phone.length > 0 ? value.phone : 'Nhập số điện thoại'}
                          value={value.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                        />
                      </Form.Item>

                    </Form>
                  </div>
                  <div className='w-full flex flex-col space-y-2'>
                    <a className='flex -flex-row'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 13.43a3.12 3.12 0 1 0 0-6.24 3.12 3.12 0 0 0 0 6.24Z" stroke="#555555" strokeWidth="1.5"></path><path d="M3.62 8.49c1.97-8.66 14.8-8.65 16.76.01 1.15 5.08-2.01 9.38-4.78 12.04a5.193 5.193 0 0 1-7.21 0c-2.76-2.66-5.92-6.97-4.77-12.05Z" stroke="#555555" strokeWidth="1.5"></path></svg> Chọn địa chỉ bạn sẽ nhận hàng </a>
                    <Select
                      name='address'
                      allowClear
                      placeholder="Chọn địa điểm cửa hàng nhận hàng"
                      style={{ width: window.innerWidth >= 768 ? "100%" : "100%", minWidth: '200px' }}
                      onChange={(val) => handleChange('address', val)}
                      value={value.address}
                    >
                      <Select.Option value="DC1">xx đường Nguyễn Huệ, quận 1, tp. Hồ Chí Minh</Select.Option>
                      <Select.Option value="DC2">xx đường Hai Bà Trưng, quận Ba Đình, tp. Hà Nội</Select.Option>
                      {/* <Select.Option value=""></Select.Option> */}
                    </Select>
                  </div>

                  <div className='w-full flex flex-col space-y-2'>
                    <a className='flex -flex-row'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#555555" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15.695 13.7h.009M15.695 16.7h.009M11.995 13.7h.01M11.995 16.7h.01M8.294 13.7h.01M8.294 16.7h.01" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg> Chọn thời gian lấy hàng trực tiếp</a>
                    <DatePicker
                      // showTime

                      format={dateFormat}
                      style={{ width: window.innerWidth >= 768 ? "100%" : "100%", minWidth: '200px' }}
                      defaultValue={today}
                      minDate={today}
                      value={value.date ? dayjs(value.date, dateFormat) : null}
                      onChange={(date, dateString) => handleChange('date', dateString)}
                    />
                    <p>Cửa hàng làm việc từ 08:00 - 22:00 mỗi ngày trong tuần</p>
                  </div>
                  <div className='w-full flex flex-col space-y-2'>
                    <a><FormOutlined style={{ fontSize: '20px' }} /> Ghi chú </a>
                    <TextArea
                      placeholder="Nhập ghi chú nếu cần"
                      name='note'
                      allowClear
                      rows={4}
                      style={{ width: window.innerWidth >= 768 ? "100%" : "100%", minWidth: '200px' }}
                      value={value.note}
                      onChange={(e) => handleChange('note', e.target.value)}
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1 w-full justify-center items-center p-5'>
                  <div className="md:m-12 bg-gray-700 md:w-11/12 max-w-full w-auto h-auto space-y-7 rounded-xl hover:bg-gray-900 hover:scale-90 duration-200 p-5">
                    <figure className="w-10 h-10 p-2 bg-blue-800 rounded-md">
                      <svg width="24" height="24" fill="#FFFFFF">
                        <path d="M18.799 7.038c-.496-.535-.799-1.252-.799-2.038 0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3c-.146 0-.29-.01-.431-.031l-3.333 6.032c.475.53.764 1.231.764 1.999 0 1.656-1.344 3-3 3s-3-1.344-3-3c0-.583.167-1.127.455-1.587l-2.565-3.547c-.281.087-.58.134-.89.134l-.368-.022-3.355 6.069c.451.525.723 1.208.723 1.953 0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3c.186 0 .367.017.543.049l3.298-5.967c-.52-.539-.841-1.273-.841-2.082 0-1.656 1.344-3 3-3s3 1.344 3 3c0 .617-.187 1.191-.507 1.669l2.527 3.495c.307-.106.637-.164.98-.164.164 0 .325.013.482.039l3.317-6.001zm-3.799 7.962c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-6-8c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"></path>
                      </svg>
                    </figure>
                    <h4 className="py-2 text-white font-bold">Tên người nhận: {value.name}</h4>

                    <h4 className="py-2 text-white font-bold">Số điện thoại: {value.phone}</h4>
                    <p className="text-base leading-7 text-white font-semibold ">Địa điểm nhận</p>
                    <p className="text-base leading-7 text-white font-extralight ">{value.address === "DC1" ? "xx đường Nguyễn Huệ, quận 1, tp. Hồ Chí Minh" : value.address === "" ? "" : "xx đường Hai Bà Trưng, quận Ba Đình, tp. Hà Nội"}</p>
                    <p className="text-base leading-7 text-white font-semibold ">Thời gian: Ngày {value.date}</p>
                    {/* <p className="text-base leading-7 text-white font-semibold space-y-4"></p> */}
                    <p className="text-sm leading-7 text-slate-300 space-y-4 w-[full] break-all max-h-[400px] hover:overflow-y-scroll overflow-y-hidden">Ghi chú:<br /> {value.note}</p>
                    <div className="pt-5 pb-2 flex justify-center">

                      <button className={`w-36 h-10  font-semibold rounded-md bg-indigo-100 hover:scale-90 duration-500`} onClick={() => { onChange(1); setCheck(value.option); }}>Bước tiếp <RightCircleFilled /></button>
                    </div>
                  </div>
                </div>
              </div>
              )}
              {value.option === 2 && (<div data-aos="zoom-out" className='grid grid-cols-1 md:grid-cols-2 border-2 w-full h-auto justify-start space-y-5 font-mono'>
                <div className='grid grid-cols-1 w-full p-6'>
                  <p>(Lấy hàng qua đơn vị vận chuyển)</p>
                  <div className='w-full flex flex-col space-y-2'>
                    <a className='flex -flex-row'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM12 8v5" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.995 16h.009" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg> Nhập thông tin người nhận</a>
                    <Form style={{ width: window.innerWidth >= 768 ? "100%" : "100%", minWidth: '200px' }}>
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: 'Hãy nhập tên!',
                          }
                        ]}
                      >
                        <Input
                          allowClear
                          placeholder={value.name.length > 0 ? value.name : 'Nhập tên'}
                          value={value.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: 'Hãy nhập số điện thoại',
                          },
                          {
                            pattern: /^0\d{9}$/,
                            message: 'Số điện thoại phải là số và đúng định dạng!',
                          },
                          {
                            max: 10,
                            message: 'Số điện thoại 10 số',
                          }
                        ]}
                      >
                        <Input
                          allowClear

                          placeholder={value.phone.length > 0 ? value.phone : 'Nhập số điện thoại'}
                          value={value.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Hãy nhập email',
                          },
                          {
                            type: 'email',
                            message: 'Email phải là email',
                          }

                        ]}
                      >
                        <Input
                          allowClear

                          placeholder={value.email.length > 0 ? value.email : 'Nhập email để chúng tôi gửi mã vận đơn đến bạn'}
                          value={value.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                        />
                      </Form.Item>

                    </Form>
                  </div>
                  <div className='w-full flex flex-col space-y-2'>
                    <a className='flex -flex-row'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 13.43a3.12 3.12 0 1 0 0-6.24 3.12 3.12 0 0 0 0 6.24Z" stroke="#555555" strokeWidth="1.5"></path><path d="M3.62 8.49c1.97-8.66 14.8-8.65 16.76.01 1.15 5.08-2.01 9.38-4.78 12.04a5.193 5.193 0 0 1-7.21 0c-2.76-2.66-5.92-6.97-4.77-12.05Z" stroke="#555555" strokeWidth="1.5"></path></svg> Nhập địa chỉ bạn sẽ nhận hàng </a>
                    <TextArea
                      placeholder="Nhập ghi chú nếu cần"
                      name='address1'
                      allowClear
                      rows={3}
                      style={{ width: window.innerWidth >= 768 ? "100%" : "100%", minWidth: '200px' }}
                      value={value.address1}
                      onChange={(e) => handleChange('address1', e.target.value)}
                    />
                  </div>

                  <div className='w-full flex flex-col space-y-2 mt-2'>
                    <a><FormOutlined style={{ fontSize: '20px' }} /> Ghi chú </a>

                    <TextArea
                      placeholder="Nhập ghi chú nếu cần"
                      name='note1'
                      allowClear
                      rows={4}
                      style={{ width: window.innerWidth >= 768 ? "100%" : "100%", minWidth: '200px' }}
                      value={value.note1}
                      onChange={(e) => handleChange('note1', e.target.value)}
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1 w-full justify-center items-center p-5'>
                  <div className="md:m-12 bg-gray-700 md:w-11/12 w-full  h-auto space-y-7 rounded-xl hover:bg-gray-900 hover:scale-90 duration-200 p-5">
                    <figure className="w-10 h-10 p-2 bg-blue-800 rounded-md">
                      <svg width="24" height="24" fill="#FFFFFF">
                        <path d="M18.799 7.038c-.496-.535-.799-1.252-.799-2.038 0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3c-.146 0-.29-.01-.431-.031l-3.333 6.032c.475.53.764 1.231.764 1.999 0 1.656-1.344 3-3 3s-3-1.344-3-3c0-.583.167-1.127.455-1.587l-2.565-3.547c-.281.087-.58.134-.89.134l-.368-.022-3.355 6.069c.451.525.723 1.208.723 1.953 0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3c.186 0 .367.017.543.049l3.298-5.967c-.52-.539-.841-1.273-.841-2.082 0-1.656 1.344-3 3-3s3 1.344 3 3c0 .617-.187 1.191-.507 1.669l2.527 3.495c.307-.106.637-.164.98-.164.164 0 .325.013.482.039l3.317-6.001zm-3.799 7.962c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-6-8c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"></path>
                      </svg>
                    </figure>
                    <h4 className="py-2 text-white font-bold">Tên người nhận: {value.name}</h4>

                    <h4 className="py-2 text-white font-bold">Số điện thoại: {value.phone}</h4>
                    <h4 className="py-2 text-white font-bold">Email: {value.email}</h4>
                    <p className="text-base leading-7 text-white font-semibold ">Địa điểm nhận</p>
                    <p className="text-base leading-7 text-white font-extralight ">{value.address1}</p>
                    {/* <p className="text-base leading-7 text-white font-semibold ">Thời gian: Ngày {value.date}</p> */}
                    {/* <p className="text-base leading-7 text-white font-semibold space-y-4"></p> */}
                    <p className="text-sm leading-7 text-slate-300 space-y-4 w-[full] break-all max-h-[400px] hover:overflow-y-scroll overflow-y-hidden">Ghi chú:<br /> {value.note1}</p>
                    <div className="pt-5 pb-2 flex justify-center">
                      <button className={`w-36 h-10  font-semibold rounded-md bg-indigo-100 hover:scale-90 duration-500`}
                        onClick={() => {
                          onChange(1)
                          setCheck(value.option)
                        }
                        }>Bước tiếp <RightCircleFilled /></button>
                    </div>
                  </div>
                </div>
              </div>

              )}
            </div>
          }

          {current === 1 &&
            <div className='w-full justify-center items-center space-y-5 '>

              <Radio.Group onChange={onChange1} value={value.option}>

                <Radio value={3}>Thanh toán bằng ngân hàng <CreditCardOutlined /></Radio>
                <Radio value={4}>Thanh toán bằng tiền mặt <MoneyCollectOutlined /></Radio>
              </Radio.Group>
              {value.option === 3 &&
                (
                  <div data-aos="zoom-out" className='border-2 flex flex-col justify-center items-center  font-mono '>
                    <h1 className='text-xl flex text-center font-bold mt-4' >Hình Thức Thanh Toán Tiền Bằng Ngân Hàng</h1>

                    <div className='grid grid-cols-1 md:grid-cols-2 w-full h-auto justify-center items-center p-5 space-y-5'>
                    {orderpay.map((orderpay) => (
                      <div className='grid grid-cols-1   p-6 md:ml-16 text-xl font-medium '>
                        <h1 className='md:w-2/3 w-full '>
                          Số tiền bạn cần chuyển là: {formatCurrency(orderpay.total_price)} <br />
                          Nội dung chuyển khoản : "Thanh toán đơn hàng ({orderpay.id_order}) ".
                        </h1>
                        <br />
                        <h1 className='md:w-2/3 w-full '>
                          Sẽ có nhân viên xác nhận và xác nhận với bạn 🤗🤗.<br />
                          Quý khách gặp vấn đề gì có thể liên hệ vào số  +84123456789
                        </h1>
                        <button className={`w-36 h-10  font-semibold rounded-md bg-indigo-100 hover:scale-90 duration-500 mt-5`} onClick={() => onChange(2)}>Bước tiếp <RightCircleFilled /></button>
                      </div>
                    ))}
                      <div className='grid grid-cols-1 md:grid-cols-2 w-full md:p-6  justify-center items-center'>
                        <div className='grid grid-cols-1 md:ml-3 md:w-full '>
                          <h1 className='mb-2 font-thin text-sm text-red-500'>"Đây là số tài khoản của cửa hàng
                            Quý Khách vui lòng chuyển tiền vào số tài khoản trên hoặc quét mã QR." </h1>
                          <div class="visa-card">
                            <div class="logoContainer">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="23"
                                height="23"
                                viewBox="0 0 48 48"
                                class="svgLogo"
                              >
                                <path
                                  fill="#ff9800"
                                  d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                                ></path>
                                <path
                                  fill="#d50000"
                                  d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                                ></path>
                                <path
                                  fill="#ff3d00"
                                  d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                                ></path>
                              </svg>
                            </div>
                            <div class="number-container">
                              <label className='font-bold'>Ngân Hàng Mb Bank</label>
                              <hr />
                              <label class="input-label mt-4 font-bold text-xl" for="cardNumber">Số Tài khoản</label>
                              <input
                                class="inputstyle"
                                id="cardNumber"
                                placeholder="0917789964"
                                name="cardNumber"
                                type="text"
                              />
                            </div>

                            <div class="name-date-cvv-container">
                              <div class="name-wrapper">
                                <label class="input-label" for="holderName">Tên tài khoàn</label>
                                <input
                                  class="inputstyle"
                                  id="holderName"
                                  placeholder="VU HUY HOANG"
                                  type="text"
                                />
                              </div>

                            </div>
                          </div>
                        </div>
                        <div className='grid grid-cols-1 md:ml-16 justify-center items-center px-[65px] text-center w-full mt-5'>
                          <QRCode type="canvas" value="https://ant.design/" />
                          <h1>Mã QR ngân hàng</h1>
                        </div>
                      </div>




                    </div>
                  </div>
                )
              }
              {value.option === 4 && (
                <div data-aos="zoom-out" className='flex   w-full h-auto justify-center items-center   font-mono '>
                  <div className='flex justify-center items-center w-full md:w-1/2 border-2 space-y-10 gap-y-4 text-start flex-col  p-8'>
                    <h1 className='text-xl text-center font-bold' >Hình Thức Thanh Toán Tiền Bằng Tiền Mặt</h1>
                    <h1>
                      Bạn Thanh toán bằng tiền mặt tại địa chỉ {value.address === "DC1" ? "xx đường Nguyễn Huệ, quận 1, tp. Hồ Chí Minh" : value.address === "DC2" ? "xx đường Hai Bà Trưng, quận Ba Đình, tp. Hà Nội" : ""}<br /> {value.address1}
                      {value.address1.length > 0 ? (<h1><br></br>Bạn có thể giao dịch với shipper.
                        <br />Shipper sẽ đại diện cửa hàng giao hàng đến tận tay bạn.<br /> Chúng tôi sẽ gửi thông tin đơn hàng đến email của bạn.<br /> Bạn vui lòng để ý email thường xuyên chúng tôi sẽ liên hệ sớm nhất. </h1>)
                        :
                        (<h1>
                          Bạn đến quầy than toán tại cửa hàng để hoàn tất thanh toán và nhận hàng.
                        </h1>)
                      }

                    </h1>
                    <button className={`w-36 h-10  font-semibold rounded-md bg-indigo-100 hover:scale-90 duration-500 mt-5`} onClick={() => { 
                      onChange(2);
                    
                      }}>Bước tiếp <RightCircleFilled /></button>
                    <p> Quý khách gặp vấn đề gì có thể liên hệ vào số  +84123456789</p>
                  </div>
                </div>
              )}
            </div>

          }
          
          
          {current === 2 && check && value.option &&
            <div className='w-full h-full font-mono md:px-14 px-2 min-h-screen justify-center items-center'>

              <div className='grid md:grid-cols-2 gird-cols-1  w-full h-auto justify-between items-center   font-mono '>
                <div data-aos="zoom-in-right" className='grid grid-cols-1  w-full text-black'>
                  {/* chờ xác nhận */}
                  {check === 1 && value.option === 3 &&
                    (<div>
                      <h1>Đơn hàng của bạn sẽ được quản lý xác nhận thanh toán.
                        Cửa hàng "{value.address === "DC1" ? "xx đường Nguyễn Huê, quận 1, tp. Hồ Chí Minh" : value.address === "DC2" ? "xx đường Hai Bà Trưng, quận Ba Đình, tp. Hà Nội" : ""}"
                        sẽ chuẩn bị hàng và liên hệ sớm nhất với bạn trước ngày trước 22:00 giờ {value.date}.</h1>

                    </div>)}
                  {/* xác nhận */}
                  {check === 1 && value.option === 4 &&
                    (<div>
                      <h1>Đây là địa chỉ "{value.address === "DC1" ? "xx đường Nguyễn Huê, quận 1, tp. Hồ Chí Minh" : "xx đường Hai Bà Trưng, quận Ba Đình, tp. Hà Nội"}" bạn có thể
                         đến quầy thu ngân thanh toán và nhận hàng khi đến đọc số điện thoại hoặc ID Order: {orderId}</h1>

                    </div>)}
                  {/* chờ xác nhận và gửi mail */}
                  {check === 2 && value.option === 3 &&
                    (<div>
                      <h1>

                        Đơn hàng đã được quản lý xác nhận thanh toán. Chúng tôi sẽ gửi đơn hàng qua địa chỉ email {value.email} của bạn sớm nhất.
                        Mong bạn kiểm tra email hoặc nếu có thắc mắc hãy liên hệ số +84123456789. Chúng tôi làm việc từ 08:00 - 22:00 mỗi ngày trong tuần.
                      </h1>


                    </div>)}
                  {/* xác nhận và gửi mail */}
                  {check === 2 && value.option === 4 &&
                    (<div>
                      <h1>

                        Chúng tôi sẽ chuẩn bị đơn hàng để giao đến bạn với hình thức thanh toán khi nhận hàng (COD). Chúng tôi
                        sẽ gửi đơn hàng qua địa chỉ email {value.email} của bạn sớm nhất. Mong bạn kiểm tra email hoặc nếu có thắc mắc hãy liên
                        hệ số +84123456789. Chúng tôi làm việc từ 08:00 - 22:00 mỗi ngày trong tuần.

                      </h1>


                    </div>
                    )}
                  <from className='w-full justify-center items-center flex mt-5 flex-col'>

                    <TextArea

                      style={{ width: window.innerWidth > 768 ? "80%" : "100%", height: "auto", overflow: 'hidden', color: "black" }}
                      autoSize={{
                        minRows: 6,
                        maxRows: 8,
                      }} defaultValue={defaultValue} disabled />


                  </from>



                </div>
                {orderpay.map((orderpay) =>  (
                  <div data-aos="zoom-in-left" className='gird grid-cols-1 md:h-[600px] hover:overflow-y-scroll overflow-hidden  justify-center items-center text-center w-full'>

                    <div id='pdf-content' className='border border-gray-800 flex-row w-[full] md:w-4/5 overflow-hidden  
                                  justify-center h-auto items-center p-1 m-4 bg-white '>
                      <ParentComponent selectedOrderId={orderpay.id_order} />
                      <p className='text-black font-mono'>ID Order: {orderpay.id_order}</p>
                      <p className='border-b-2 mb-5 w-full'>Ghi chú: {orderpay.notes}</p>

                      <p className='text-black font-black text-xl font-mono  text-center'> CHi tiết hóa Đơn </p>
                      <p className='text-black font-black text-xl font-mono  text-center'> {formattedTimestamp(orderpay.date_order)} </p>

                      {orderpay?.order_details.map((detail, index) => (
                        <div className="mb-2  font-mono  flex-row border-b-2 border-dashed my-2 text-start">
                          <div className='flex flex-col w-full'>
                            <p className='font-semibold text-[#214f32]'> (SP{index + 1}) "{detail.product?.name || 'Tên sản phẩm'}"</p>
                            <img src={detail.product?.images || ''} alt="anh" className='w-16 h-16' />
                          </div>
                          <p className='text-end'>Giá:{formatCurrency(detail.total_amount / detail.qty)}</p>
                          <p className='text-end'>SL:{detail.qty} </p>

                          <p className='text-end mb-2'>TT: {formatCurrency(detail.total_amount)}</p>
                        </div>
                      ))}

                      <p className='text-end text-black font-mono'>Tổng tiền: {formatCurrency(orderpay.total_price)}</p>
                    </div>

                  </div>
                 ))} 
               

              </div>
              <div className='w- flex justify-center items-center py-6'>
                  <button 
                  
                   onClick={() => {
                    payOrders();
                   
                  }}
                  
                  class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white
                 font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110
                  hover:animate-pulse active:animate-bounce">
                  Xác Nhận Thanh Toán
                </button>
                </div>


            </div>}
        </div>
      </div>
      )
      :(<PayErorr></PayErorr>)

    }

    </Layout>
  );
}

export default Pay;

