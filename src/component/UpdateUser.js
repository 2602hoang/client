import { Button, Form, Input, notification, Select, Upload } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { URL } from '../url';
import { PlusOutlined } from '@ant-design/icons';
import { AuthContext } from '../contexts/AuthContextProvider';

function UpdateUser({ id_user, getAllUser, handleModalClose ,role ,getAllRole }) {

    const [user, setUser] = useState({});
    const {userToken} = useContext(AuthContext);
    const getOneUser = async () => {
        try {
            const token = userToken;
            const response = await axios.get(`${URL}api/v1/user/getone/${id_user}`,
            {headers: {"Authorization": `Bearer ${token}`}}
            );
            if(response.data.success === true) {
            setUser(response.data.user);

            if (response.data.avatar) {
                    setImageList([
                        {
                            uid: '-1',
                            name: 'image.png',
                            status: 'done',
                            url: response.data.avatar,
                        }
                    ]);
                }
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
            const token = userToken;
             await axios.put(`${URL}api/v1/user/update/${id_user}`, formData, {
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'multipart/form-data' 
                }
            });
            handleModalClose();
            getAllUser();
            notification.success({
                message: 'Thành công',
                description: `Cập nhật người dùng thành công! ID: ${id_user}`,
                showProgress: true,
                duration: 1,
            });
        } catch (error) {
            console.error('Error updating user:', error);
            notification.error({
                message: 'Lỗi',
                description: 'Đã xảy ra lỗi khi cập nhật người dùng.',
                showProgress: true,
                duration: 1,
            });
        }
    };
    
    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append('username', values.username || user.username);
        formData.append('phone', values.phone || user.phone);
        formData.append('id_role', parseInt(values.id_role) || user.id_role);
    
        if (values.password) {
            formData.append('password', values.password);
        }
    
        if (imageList.length > 0 && imageList[0].originFileObj) {
            formData.append('avatar', imageList[0].originFileObj);
        }
    
        handleUpdate(formData);
    };

    useEffect(() => {
        getOneUser();
        getAllRole();
    }, [id_user, userToken]);
    console.log(role);
    return (
        <div>
            {user && (
                <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                onFinish={handleSubmit}
                layout='horizontal'
                size='large'
                initialValues={user} // Set initial values directly from user object
                className='w-full mx-5'
            >
                <Form.Item label="Username" name="username">
                    <Input placeholder={`${user.username}`} />
                </Form.Item>
    
                <Form.Item
                rules={[{
                     message: 'Vui lòng nhập mật khẩu!',
                    min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' 
                   }]}
                label="Đổi Mật khẩu" name="password">
                    <Input.Password placeholder="Password" />
                </Form.Item>
    
                <Form.Item label="SĐT" name="phone"
                 rules={[
                    {  message: 'Vui lòng nhập số điện thoại!' },
                    { len: 10, message: 'Số điện thoại phải là 10 ký tự!' },
                    { pattern: /^[0-9]{10}$/, message: 'Số điện thoại phải là số và có 10 chữ số!' }
                ]}
                
                >
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
