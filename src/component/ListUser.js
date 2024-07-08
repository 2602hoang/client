import React, { useContext, useEffect, useState } from 'react';
import { formattedTimestamp } from '../untils/index.js';
import { Button, Image, notification, Popconfirm, Modal, Select, Input } from 'antd';
import { URL } from '../url/index.js';
import axios from 'axios';
import { QuestionCircleOutlined } from '@ant-design/icons';
import UpdateUser from './UpdateUser.js';
import { AuthContext } from '../contexts/AuthContextProvider.js';
const { Option } = Select;
const { Search } = Input;
function ListUser({ user, getAllUser,getAllRole, role }) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { userToken, userRole } = useContext(AuthContext);
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
            const token = userToken;
            await axios.put(`${URL}api/v1/user/delete/${id_user}`,null,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            notification.warning({
                message: 'Thành công',
                description: `Xóa tài khoản thành công! ID: ${id_user}`,
            });
            getAllUser(); // Refresh the user list after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    const handleRoleChange = (value) => {
        setSelectedRole(value);
        // Perform filtering logic here if necessary
        // This is where you might trigger a new API call to fetch users based on the selected role
    };
    const handleSearch = (value) => {
        setSearchQuery(value);
    };

    
    useEffect(() => {
        getAllUser();
    }, [userToken]);

    return (
        <div>
        {user.length > 0 ? (
            <div>
                <div className='flex gap-6 flex-col px-6 w-full justify-end items-end mb-2'>
                    <p className='text-xl font-medium'>Tìm theo chức vụ</p>
                    <div className='flex w-full gap-6 justify-end items-end'>
                        <Select
                            placeholder="Chọn chức vụ"
                            value={selectedRole}
                            onChange={handleRoleChange}
                            style={{ width: 200 }}
                            allowClear
                        >
                            <Option value="">Tất cả</Option>
                            {role.map((role) => (
                                <Option key={role.id_role} value={role.id_role}>
                                    {role.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className='flex md:w-1/3 w-full justify-end items-end'>
                        <Search
                            placeholder="Tìm theo số điện thoại"
                            className="w-full"
                            onSearch={handleSearch}
                            enterButton
                        />
                    </div>
                </div>
                <div className="grid my-3 md:grid-cols-4 grid-cols-1 md:gap-4 gap-2 w-full mx-2">
                    {user.map((user) => {
                        if ((selectedRole && user.id_role !== selectedRole) ||
                            (searchQuery && !user.phone.includes(searchQuery))) {
                            return null;
                        }
                        return (
                            <div key={user.id_user} className="flex flex-col bg-white w-11/12 h-auto rounded-md py-4 px-6 border-2">
                                <h1 className="text-center font-bold text-xl text-gray-800 pb-2">ID:{user.id_role ===123 ? "QL": user.id_role === 124 ? "NV" : "KH"}  {user.id_user}</h1>
                                <h3 className="text-center font-bold text-xl text-gray-800 pb-2">Tên: {user.username}</h3>
                                <h3 className="text-base font-semibold text-gray-900">SĐT/Tài Khoản: {user.phone}</h3>
                                <h3 className="text-base font-semibold text-gray-900">Chức vụ: {user.id_role === 123 ? 'Quản lý' : user.id_role === 124 ? 'Nhân viên' : 'Khách hàng'}</h3>
                                <p className="text-sm text-gray-500 pb-3">Ngày tạo: {formattedTimestamp(user.created_at)}</p>
                                <div className="flex gap-2 text-sm text-gray-500 border-b pb-2 justify-center items-center">
                                    <Image src={user.avatar} style={{ height: '100px', width: '100px' }} className="rounded-3xl" />
                                </div>
                                {/* {userRole === 123 && ( */}
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
                                {/* )} */}
                                <Modal
                                    title={<h1 className='text-center text-4xl font-bold border-b-2 pb-4'>Chỉnh Sửa Người Dùng</h1>}
                                    className='overflow-hidden text-center w-1/2 h-min-screen'
                                    width={window.innerWidth >= 768 ? "50%" : "100%"}
                                    open={openModal && selectedUserId === user.id_user}
                                    onCancel={handleModalClose}
                                    footer={null}
                                >
                                    {user && (
                                        <UpdateUser
                                            role={role}
                                            getAllRole={getAllRole}
                                            id_user={user.id_user}
                                            handleModalClose={handleModalClose}
                                            getAllUser={getAllUser}
                                        />
                                    )}
                                </Modal>
                            </div>
                        );
                    })}
                </div>
            </div>
        ) : (
            <h1 className='text-center md:text-5xl text-3xl justify-center items-center mt-24 font-black'>(Quản lý mới xem được)</h1>
        )}
    </div>
    )
}

export default ListUser;
