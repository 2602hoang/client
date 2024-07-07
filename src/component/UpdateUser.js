import { Button, Form, Input, notification, Select, Upload } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { URL } from '../url';
import { PlusOutlined } from '@ant-design/icons';

function UpdateUser({ id_user, getAllUser, handleModalClose ,role ,getAllRole }) {

    const [user, setUser] = useState({});

    const getOneUser = async () => {
        try {
            const response = await axios.get(`${URL}api/v1/user/getone/${id_user}`);
            if(response.data.success === true) {
            setUser(response.data.user);
            }
            else {
                setUser({}); 
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUser({});
        }
    };
    const [imageList, setImageList] = useState([]);
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handleImageChange = ({ fileList }) => {
        setImageList(fileList);
    };

    const handleUpdate = async (formData) => {
        try {
            const response = await axios.put(`${URL}api/v1/user/update/${id_user}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            handleModalClose();
            getAllUser();
            notification.success({
                message: 'Thành công',
                description: `Cập nhật người dùng thành công! ID: ${id_user}`,
            });
        } catch (error) {
            console.error('Error updating user:', error);
            notification.error({
                message: 'Lỗi',
                description: 'Đã xảy ra lỗi khi cập nhật người dùng.',
            });
        }
    };

    useEffect(() => {
        getOneUser();
        getAllRole();
    }, [id_user]);
    console.log(role);
    return (
        <div>
            {user && (
                <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                onFinish={handleUpdate}
                layout='horizontal'
                size='large'
                initialValues={user} // Set initial values directly from user object
                className='w-full mx-5'
            >
                <Form.Item label="Username" name="username">
                    <Input placeholder={`${user.username}`} />
                </Form.Item>
    
                <Form.Item label="Đổi Mật khẩu" name="password">
                    <Input.Password placeholder="Password" />
                </Form.Item>
    
                <Form.Item label="SĐT" name="phone">
                    <Input placeholder={`${user.phone}`} />
                </Form.Item>
    
                <Form.Item label="Chức vụ" name="id_role">
                    <Select placeholder={`${user.id_role===123 ? "Quản lý" : user.id_role===124 ? "Nhân Viên" : "Khách hàng"}`}>
                        {role.map((role) => (
                            <Select.Option key={role.id_role} value={role.id_role}>
                                {role.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
    
                <Form.Item label="Hình ảnh" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload
                        action="/upload.do"
                        listType="picture-card"
                        fileList={imageList}
                        onChange={handleImageChange}
                    >
                        {imageList.length < 1 && (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
    
                <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                    <Button type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
                
            )
        
        }
    </div>
    )
}

export default UpdateUser;
