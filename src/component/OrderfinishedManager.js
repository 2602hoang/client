import { Button, Form, Input, message, Modal, notification, Popconfirm, Space, Table, Tag, Tooltip } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { URL } from '../url';
import axios from 'axios';
import { formatCurrency, formattedTimestamp } from '../untils';
import TextArea from 'antd/es/input/TextArea';
import { InfoCircleFilled } from '@ant-design/icons';
import ParentComponent from './ParentComponent';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextProvider';
// import Search from 'antd/es/transfer/search';
const { Search } = Input;

function OrderfinishedManager() {

    const nav = useNavigate();
    const [orders, setOrders] = useState([]);
    const [filterOrders, setFilterOrders] = useState([]);
    const [filterConfirmed, setFilterConfirmed] = useState(false);
    const [filterNotConfirmed, setFilterNotConfirmed] = useState(false);

    const [filterAll, setFilterAll] = useState(false);

    //   const [selectedOrderAll, setSelectedOrderAll] = useState([]);

    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [notePays, setNotePays] = useState('');
    const {userToken}=useContext(AuthContext);
    const showModal = async (id_order) => {
        setSelectedOrderId(id_order);
        setOpen(true);
        try {
            const response = await axios.get(`${URL}api/v1/order/getonebyOrderId/${id_order}`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                }
            );
            setSelectedOrderDetails(response.data.order);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOk = () => {
        setOpen(false);
        setSelectedOrderId(null);
        setSelectedOrderDetails(null);
    };
    // console.log(userId);
    const handleCancel = () => {
        setOpen(false);
        setSelectedOrderId(null);
        setSelectedOrderDetails(null);
    };

    const showModal1 = (id_order) => {
        setSelectedOrderId(id_order);
        setOpen1(true);
    };

    const handleOk1 = () => {
        setOpen1(false);
        setSelectedOrderId(null);
        setSelectedOrderDetails([]);
    };

    const handleCancel1 = () => {
        setOpen1(false);
        setSelectedOrderId(null);
        setSelectedOrderDetails([]);
    };
    const showModal2 = (id_order) => {
        setSelectedOrderId(id_order);
        setOpen2(true);
    };

    const handleOk2 = () => {
        setOpen2(false);
        setSelectedOrderId(null);
        setSelectedOrderDetails([]);
    };

    const handleCancel2 = () => {
        setOpen2(false);
        setSelectedOrderId(null);
        setSelectedOrderDetails([]);
    };





    const getOrders = async () => {
        try {
            const response = await axios.get(`${URL}api/v1/order/getall/status1/idpay25`,
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
            console.table(ordersWithKeys); // Log to see the fetched orders
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };



    useEffect(() => {
        getOrders(); // Call getOrders initially and whenever id_pay changes
    }, [userToken]);
    useEffect(() => {
        // Apply filters when filterConfirmed or filterNotConfirmed changes
        let filtered = orders;
        if (filterConfirmed) {
            filtered = orders.filter(order => order.id_pay === 2 && order.finished === 1);
        } else if (filterNotConfirmed) {
            filtered = orders.filter(order => order.id_pay === 3 || order.id_pay === 5  && order.finished === 1);

        } else if (searchTerm) {
            filtered = orders.filter(order => order.user.phone.toString().includes(searchTerm));
        }

        else if (filterAll) {
            filtered = orders.filter(order => order.finished === 0);
        }

        setFilterOrders(filtered);
    }, [userToken,orders, filterConfirmed, filterNotConfirmed, searchTerm ,filterAll]);

    const countItemsByIdSP = (selectedOrderDetails) => {
        const countMap = {};
        selectedOrderDetails?.forEach((orderItem) => {
            if (orderItem.order_details && Array.isArray(orderItem.order_details)) {
                orderItem.order_details?.forEach(detail => {
                    if (detail.id_product) {
                        if (countMap[detail.id_product]) {
                            countMap[detail.id_product].count += detail.qty;
                            countMap[detail.id_product].total_amount += detail.total_amount;
                            // countMap[detail.product.name];
                        } else {
                            countMap[detail.id_product] = {
                                count: detail.qty,
                                total_amount: detail.total_amount,
                                name: detail.product.name,
                                price: detail.total_amount / detail.qty,
                                images: detail.product.images
                            }
                        }
                    }
                });
            }
        });

        return countMap;
    }




    const prodcut = countItemsByIdSP(selectedOrderDetails);


    const hendleXacnhan = async (selectedOrderId) => {
        try {
            await axios.put(`${URL}api/v1/order/finished2/${selectedOrderId}`,{
                headers: {
                    Authorization: `Bearer ${userToken}`
                },
            });
            notification.success({
                message: `Xác nhận đơn hàng thành công ${selectedOrderId}`,
            });
            getOrders();
            setOpen1(false);
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };

    const hendleThatBai = async (selectedOrderId) => {
        try {
            await axios.put(`${URL}api/v1/order/finished3/${selectedOrderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                }
            );
            notification.success({
                message: `Xác nhận đơn hàng thành công ${selectedOrderId}`,
            });
            getOrders();
            setOpen1(false);
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };

    const handleHuy = async (selectedOrderId) => {
        try {
            await axios.put(`${URL}api/v1/order/finished5/${selectedOrderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                }
            );
            notification.success({
                message: `Hủy đơn hàng thành công ${selectedOrderId}`,
            });
            getOrders();
            setOpen2(false);
        } catch (error) {
            console.error('Error canceling order:', error);
        }
    };

    const cancel = () => {
        message.error('Bạn chọn Không');
    };

   
    return (
        <div className='flex flex-col w-full h-auto min-h-screen my-9'>
            <div data-aos="fade-down" className='flex flex-col md:w-full justify-center items-center'>

                <ul className=' [&:hover>li]:opacity-10 w-full md:flex flex-col md:flex-row md:space-x-7 my-2  justify-center items-center  gap-3   '>
                    <div className='flex flex-row justify-center items-center space-x-3'>
                        <li className=' hover:!opacity-100 flex '>
                            <a
                                className="
                         
                          focus:bg-yellow-300
                           rounded border border-current px-5 py-3 text-sm font-medium h-12
                          text-black transition hover:scale-110 hover:shadow-xl focus:outline-none 
                          focus:ring
                            active:text-indigo-500"
                                onClick={() => {
                                    setFilterAll(true);
                                    setFilterConfirmed(false);
                                    setFilterNotConfirmed(false);
                                    notification.success({
                                        message: `Danh sách tất cả đơn hàng`,
                                    })
                                }}

                            >
                                Tất cả Đơn Chưa Hoàn Thành
                            </a>

                        </li>
                        <li className=' flex  hover:!opacity-100 '>
                            <a
                                className="
                      
                          focus:bg-yellow-300
                          rounded border border-current px-3 py-3 text-sm font-medium h-12
                          text-black transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring
                            active:text-indigo-500"
                                onClick={() => {
                                    setFilterConfirmed(true);
                                    setFilterNotConfirmed(false);
                                    setFilterAll(false);
                                    notification.success({
                                        message: `Danh sách đơn hàng thành công`,
                                    })

                                }

                                }
                            >
                                Đơn Thành Công
                            </a>


                        </li>

                        <li className='  hover:!opacity-100  flex '>
                            <a
                                className="
                       
                          focus:bg-yellow-300
                           rounded border border-current px-5 py-3 text-sm font-medium h-12
                          text-black transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring
                            active:text-indigo-500"
                                onClick={() => {
                                    setFilterNotConfirmed(true);
                                    setFilterConfirmed(false);
                                    setFilterAll(false);
                                    notification.success({
                                        message: `Danh sách đơn thất bại`,
                                    })
                                }

                                }
                            >
                                Đơn Thất Bại
                            </a>


                        </li>
                    </div>
                </ul>


            </div>

            <div data-aos="fade-down" className='flex flex-col justify-center items-center md:w-full '>
                <div className='flex flex-col w-11/12 md:w-1/3 mb-2 justify-center items-center'>
                    <Search
                        placeholder="Tìm theo sdt người đặt"
                        className="w-full"
                        onChange={e => setSearchTerm(e.target.value)}
                        enterButton
                    />
                </div>
                {filterOrders?.length > 0 ? (
                <div className='flex justify-center flex-col items-center md:w-full w-11/12 overflow-x-scroll md:overflow-x-hidden pl-[240px] md:pl-0'>
                    <table class="table-auto md:min-w-full min-w-12 border-separate font-mono border border-slate-400 ">
                        <thead>
                            <tr className='text-center text-2xl uppercase font-bold '>
                                <th className='border border-slate-300 '>STT</th>
                                <th className='border border-slate-300'>ID đơn</th>
                                <th className='border border-slate-300'>SDT người đặt</th>
                                <th className='border border-slate-300'>Ngày đặt</th>
                                <th className='border border-slate-300'>Trạng thái</th>
                                <th className='border border-slate-300'>Địa chỉ</th>
                                <th className='border border-slate-300'>Tổng tiền </th>
                                <th className='border border-slate-300'>Hành Động</th>
                            </tr>
                        </thead>


                        
                        <tbody key={orders.key} className='text-sm font-medium'>
                            {filterOrders?.map(order => (
                                <tr key={order.key} className='text-sm font-normal'>
                                    <td className='border border-slate-300  '>
                                        <Tooltip title='Xem chi tiết đơn'>
                                            <div className='text-center items-center justify-center flex flex-col'>

                                                <Button onClick={() => showModal(order.id_order)} type='link' title='Xem' icon={<InfoCircleFilled />} />
                                                {order.key}

                                            </div>
                                        </Tooltip>
                                    </td>
                                    <td className='border border-slate-300'>{order.id_order}</td>

                                    <td className='border border-slate-300'>{order.user.phone}</td>

                                    <td className='border border-slate-300'>{formattedTimestamp(order.date_order)}</td>
                                    <td className={` border border-slate-300`}>
                                        <Tag color={order.finished === 0 ? '#0970CD' : '#7ae284'}>
                                            {/* className={`${ order.finished === 0 ? '' : 'text-red-400'}}`} */}
                                            {order.finished === 0 ? 'Chưa hoàn thành' : 'Đơn hoàn thành'}
                                        </Tag>
                                        <br />
                                        <br />
                                        {/* <p className={`${ order.id_pay === 2 ? 'text-green-400'  : 'text-black'}`}>  */}
                                        <Tag color={order.id_pay === 2 ? '#7ae284' : order.id_pay=== 5 ? '#fdc323' : '#FF0000'  }>
                                            {order.id_pay === 2 ? 'Đã xác nhận' : order.id_pay ===5? 'Đơn Hủy' :'Thất bại'}
                                        </Tag>
                                    </td>
                                    <td className='border border-slate-300'>{order.id_adress === 1 ? 'HN' : order.id_adress === 2 ? 'HCM' : 'DVVC'}</td>
                                    <td className='border border-slate-300'>{formatCurrency(order.total_price)}</td>
                                    <td className='border border-slate-300'>

                                        <div className='flex flex-col space-y-4 m-2'>


                                            <TextArea
                                                name="note_pays"
                                                disabled
                                                placeholder={order.note_pays?.length > 0 ? order.note_pays : ''}
                                                defaultValue={order.note_pays}
                                            //  onChange={e => setNotePays(e.target.value)}
                                            />
                                            <div className={`${order.finished === 1 ? 'hidden' : order.id_pay === 2 ? 'block' : 'block'} flex flex-col space-y-2 justify-center items-center `}>

                                                { order.id_pay === 2 ?(
                                                <Popconfirm
                                                    title={`Bạn có chắc xác hoàn thành đơn ${order.id_order}`}
                                                    onConfirm={() => showModal1(order.id_order)}
                                                    onCancel={cancel}
                                                    okText="Vâng"
                                                    cancelText="Không"
                                                >
                                                    <a
                                                        // onClick={() => {hendleXacnhan(order.id_order)}}
                                                        className="w-11/12 group relative inline-block overflow-hidden border border-green-400 px-8 py-3 focus:outline-none focus:ring">
                                                        <span className="absolute inset-y-0 left-0 w-[2px] bg-green-400 transition-all group-hover:w-full group-active:bg-green-400"></span>
                                                        <span className="relative text-sm font-medium text-green-400 transition-colors group-hover:text-white">
                                                            Hoàn Thành
                                                        </span>
                                                    </a>
                                                </Popconfirm>
                                                ):
                                                (
                                                    <Popconfirm
                                                    title={`Bạn có chắc xác hoàn thành đơn ${order.id_order}`}
                                                    onConfirm={() => showModal2(order.id_order)}
                                                    onCancel={cancel}
                                                    okText="Vâng"
                                                    cancelText="Không"
                                                >
                                                    <a
                                                        // onClick={() => {hendleXacnhan(order.id_order)}}
                                                        className="w-11/12 group relative inline-block overflow-hidden border border-green-400 px-8 py-3 focus:outline-none focus:ring">
                                                        <span className="absolute inset-y-0 left-0 w-[2px] bg-green-400 transition-all group-hover:w-full group-active:bg-green-400"></span>
                                                        <span className="relative text-sm font-medium text-green-400 transition-colors group-hover:text-white">
                                                            Hoàn Thành
                                                        </span>
                                                    </a>
                                                </Popconfirm>
                                                )
                                                }
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                            ))}

                        </tbody>
                      


                    </table>
                </div>
                  )
                  :
                  <div className='flex w-full justify-center items-center text-center mt-52'>
                  <h1 className='text-center justify-center items-center'>Hiện Tại Rỗng</h1>
                  </div>
                  }


            </div>

            <Modal

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


                {selectedOrderDetails?.map((order) => (
                    <div data-aos="fade-down" className={` h-[auto] justify-center items-center`}>
                        <div id="pdf-content" className='w-full mt-auto flex justify-center items-center h-auto'>
                            <div className={`border-2 border-gray-800 flex-row w-[380px] overflow-hidden 
                ${order.id_pay === 1 ? 'border-yellow-300' : order.id_pay === 2 ? 'border-green-400' : order.id_pay === 5 ? 'texxt-red-400' : 'border-black'}
               justify-center h-auto items-center p-1 m-4 bg-white `}>
                                <p className='text-black font-mono'>ID Order: {order.id_order}</p>
                                <p className={`${order.id_pay === 1 ? 'text-yellow-300' : order.id_pay === 2 ? 'text-green-400' : order.id_pay === 5 ? 'texxt-red-400' : 'text-black'} text-black font-mono`}>Trạng thái:{order.id_pay === 1 ? 'Chờ Xác Nhận' : order.id_pay === 2 ? 'Đã xác nhận' : order.id_pay === 5 ? 'Đơn Hủy' : ""}</p>
                                <p className='border-b-2 mb-2 w-full'>Ghi chú: {order.notes ? order.notes : "không có ghi chú"}</p>
                                <p className='text-black font-black text-xl font-mono text-center'> CHi tiết hóa Đơn </p>
                                {Object.keys(prodcut)?.map((id, index) => (
                                    <div key={index} className="mb-2  font-mono  flex-row border-b-2 border-dashed my-2">
                                        <p className='font-semibold text-[#214f32]'>(SP{index + 1})  "{prodcut[id].name}"</p>
                                        <img src={prodcut[id].images} className='w-16 h-16' />
                                        <p className='text-end'>SL: {prodcut[id].count}</p>
                                        <p className='text-start'>Giá: {formatCurrency(prodcut[id].price)}</p>
                                        <p className='text-end mb-2'>Thành tiền: {formatCurrency(prodcut[id].price * prodcut[id].count)}</p>
                                    </div>
                                ))}
                                <p className='border-b-2 mb-2 w-full text-end'>Tổng tiền :{formatCurrency(order.total_price)}</p>


                            </div>
                        </div>
                    </div>
                ))}


            </Modal>

            <Modal
                open={open1}
                title={`Xác nhận hoàn thành đơn${selectedOrderId}`}
                onCancel={handleCancel1}
                footer={[
                    <Button key="hoanthanh" onClick={() => hendleXacnhan(selectedOrderId)}>
                        Hoàn Thành
                    </Button>,
                    <Button key="thatbai" onClick={() => hendleThatBai(selectedOrderId)}>
                        Thất Bại
                    </Button>,
                    <Button key="cancel" onClick={handleCancel1}>
                        Đóng
                    </Button>,
                ]}
            >
                <p>Bạn chọn hoàn thành đơn thành công hoặc hủy đơn?</p>
            </Modal>


            <Modal
                open={open2}
                title={`Xác nhận hoàn thành đơn${selectedOrderId}`}
                onCancel={handleCancel2}
                footer={[
                    <Button key="huy" onClick={() => handleHuy(selectedOrderId)}>
                        Hoàn Thành
                    </Button>,
                    // <Button key="huy" onClick={() => handleHuy(selectedOrderId)}>
                    //     Thất Bại
                    // </Button>,
                    <Button key="cancel" onClick={handleCancel2}>
                        Đóng
                    </Button>,
                ]}
            >
                <p>Hoàn Thành đơn hủy {selectedOrderId}?</p>
            </Modal>


        </div>
    )
}

export default OrderfinishedManager