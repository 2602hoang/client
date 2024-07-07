import React, { useEffect, useState } from 'react';
import { formattedTimestamp } from '../untils/index.js';
import { Button, Image, notification, Popconfirm, Modal } from 'antd';
import { URL } from '../url/index.js';
import axios from 'axios';
import { QuestionCircleOutlined } from '@ant-design/icons';
import UpdateUser from './UpdateUser.js';

function ListUser({ user, getAllUser,getAllRole, role }) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleModalClose = () => {
        setOpenModal(false);
        setSelectedUserId(null);
        getAllUser();
    };

    const handleEdit = (id_user) => {
        setSelectedUserId(id_user);
        setOpenModal(true);
    };

    const handleDelete = async (id_user) => {
        try {
            await axios.put(`${URL}api/v1/user/delete/${id_user}`);
            notification.warning({
                message: 'Thành công',
                description: `Xóa tài khoản thành công! ID: ${id_user}`,
            });
            getAllUser(); // Refresh the user list after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    
    useEffect(() => {
        getAllUser();
    }, []);

    return (
        <div className="grid md:grid-cols-4 grid-cols-1 md:gap-4 gap-2 w-full mx-2">
            {user.map((user) => (
                <div key={user.id_user} className="flex flex-col bg-white w-11/12 h-auto rounded-md py-4 px-6 border-2">
                    <h3 className="text-center font-bold text-xl text-gray-800 pb-2">Tên: {user.username}</h3>
                    <h3 className="text-base font-semibold text-gray-900">SĐT/Tài Khoản: {user.phone}</h3>
                    <h3 className="text-base font-semibold text-gray-900">Chức vụ: {user.id_role === 123 ? 'Quản lý' : user.id_role === 124 ? 'Nhân viên' : 'Khách hàng'}</h3>
                    <p className="text-sm text-gray-500 pb-3">Ngày tạo: {formattedTimestamp(user.created_at)}</p>
                    <div className="flex gap-2 text-sm text-gray-500 border-b pb-2 justify-center items-center">
                        <Image src={user.avatar} style={{ height: '100px', width: '100px' }} className=" rounded-3xl"></Image>
                    </div>
                    <div className="flex justify-around items-center py-3">
                        <div className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                            <Popconfirm
                                title={<h3 className='w-60'>Bạn muốn chỉnh sửa "{user.username}" ?</h3>}
                                onConfirm={() => handleEdit(user.id_user)}
                                icon={<QuestionCircleOutlined style={{ color: 'green' }} />}
                            >
                                <svg className="w-6 stroke-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                <button className="font-semibold text-sm text-green-700">Sửa</button>
                            </Popconfirm>
                        </div>
                        <div className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                            <Popconfirm
                                title={<h3 className='w-60'>Bạn muốn xóa "{user.username}" ?</h3>}
                                onConfirm={() => handleDelete(user.id_user)}
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            >
                                <svg className="w-6 stroke-red-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                                <button className="font-semibold text-sm text-red-700">Xóa</button>
                            </Popconfirm>
                        </div>
                    </div>
                    <Modal
                        title={<h1 className='text-center text-4xl font-bold border-b-2 pb-4'>Chỉnh Sửa Người Dùng</h1>}
                        className='overflow-hidden text-center w-1/2 h-min-screen'
                        width={window.innerWidth >= 768 ? "50%" : "100%"}
                        open={openModal && selectedUserId === user.id_user}
                        onCancel={handleModalClose}
                        footer={null}
                    >
                        {user &&
                            <UpdateUser
                                role={role}
                                getAllRole={getAllRole}
                                id_user={user.id_user}
                                handleModalClose={handleModalClose}
                                getAllUser={getAllUser}
                            />}
                    </Modal>
                </div>
            ))}
        </div>
    )
}

export default ListUser;
