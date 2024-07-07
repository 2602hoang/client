import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Popconfirm, Select, Upload } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URL } from '../url';

function AddUser({navigateToList, getAllRole, role,getAllUser}) {
    const [imageList, setImageList] = useState([]);
    // const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const addUser = async (values) => {
        const formData = new FormData();
        formData.append('username', values.username);
        formData.append('password', values.password);
        formData.append('phone', values.phone);
        formData.append('id_role', parseInt(values.id_role));
        if (imageList.length > 0 && imageList[0].originFileObj) {
            formData.append('avatar', imageList[0].originFileObj);
        }

        try {
            await axios.post(`${URL}api/v1/user/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            notification.success({
                message: 'Thành Công',
                description: `Thêm thành công!`,
            });
            form.resetFields();
            setImageList([]);
            getAllUser();
            // navigateToList();
        } catch (error) {
            console.error('Error adding user:', error);
            notification.error({
                message: 'Lỗi',
                description: 'Có lỗi xảy ra khi thêm người dùng. Trùng số điện thoại',
            });
        }
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    useEffect(() => {
        getAllRole();
        getAllUser();
    }, []);

    const handleImageChange = ({ fileList }) => setImageList(fileList);
  return (
    <div className='w-full mt-14 justify-center items-center flex'>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                // onFinish={handleSubmit}
                layout='horizontal'
                size='large'
                // initialValues={user} // Set initial values directly from user object
                className='w-full mx-5'
                onFinish={addUser}
            >
                <Form.Item label="Tên" name="username"
                rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                >
                    <Input placeholder="Nhập tên" />
                </Form.Item>
                <Form.Item label="SĐT/ Tài khoản" name="phone"
                   rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                    { len: 10, message: 'Số điện thoại phải là 10 ký tự!' },
                    { pattern: /^[0-9]{10}$/, message: 'Số điện thoại phải là số và có 10 chữ số!' }
                ]}
                >
                    <Input placeholder="Số điện Thoại/ Tài khoản" />
                </Form.Item>
    
                <Form.Item label="Mật khẩu" name="password"
                rules={[{
                     required: true, message: 'Vui lòng nhập mật khẩu!',
                     min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' 
                    }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
    
                
    
                <Form.Item label="Chức vụ" name="id_role"
                rules={[{ 
                    required: true, message: 'Vui lòng chọn chức vụ!'
                    
                 }]}
                >
                    <Select placeholder="Chọn chức vụ">
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
                    {/* <Popconfirm
                     title={`Bạn Muốn xem lại danh sách Tài Khoản ?`}
                     onConfirm={() => 
                     {
                        
                         navigateToList()
                        
                     }
                         
                     }
                     icon={<QuestionCircleOutlined style={{ color: 'green' }} />}
                 > */}

                    <Button type="primary" htmlType="submit">
                        Thêm tài khoản
                    </Button>
                    {/* </Popconfirm> */}
                </Form.Item>
            </Form>
      
    </div>
  )
}

export default AddUser