import { PlusOutlined,  } from '@ant-design/icons';
import { Button, Form, Input, notification, Result, Select, Upload } from 'antd'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { URL } from '../url';
import { AuthContext } from '../contexts/AuthContextProvider';


function AddUser({ getAllRole, role}) {
    const [imageList, setImageList] = useState([]);
    // const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
   
    const {userToken,userId} = useContext(AuthContext);
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
            const token = userToken;
            await axios.post(`${URL}api/v1/user/add`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            notification.success({
                message: 'Thành Công',
                description: `Thêm thành công!`,
                showProgress: true,
                duration: 1.5,
            });
            form.resetFields();
            setImageList([]);
            // getAllUser();
            // navigateToList();
        } catch (error) {
            console.error('Error adding user:', error);
            notification.error({
                message: 'Lỗi',
                description: 'Có lỗi xảy ra khi thêm người dùng. Trùng số điện thoại',
                showProgress: true,
                duration: 1.5,
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
        // getAllUser();
    }, [userToken,userId]);

    const handleImageChange = ({ fileList }) => setImageList(fileList);
  return (
    <div   className='flex font-mono justify-center items-center md:w-full w-full'>
        {parseInt(userId) === 84 ?(
             <Form
             data-aos="fade-down"
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
                 <Input
                 allowClear
                 placeholder="Nhập tên" />
             </Form.Item>
             <Form.Item label="SĐT/ Tài khoản" name="phone"
                rules={[
                 { required: true, message: 'Vui lòng nhập số điện thoại!' },
                 { len: 10, message: 'Số điện thoại phải là 10 ký tự!' },
                 { pattern: /^[0-9]{10}$/, message: 'Số điện thoại phải là số và có 10 chữ số!' }
             ]}
             >
                 <Input allowClear placeholder="Số điện Thoại/ Tài khoản" />
             </Form.Item>
 
             <Form.Item label="Mật khẩu" name="password"
             rules={[{
                  required: true, message: 'Vui lòng nhập mật khẩu!',
                  min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' 
                 }]}
             >
                 <Input.Password allowClear placeholder="Password" />
             </Form.Item>
 
             
 
             <Form.Item label="Chức vụ" name="id_role"
             rules={[{ 
                 required: true, message: 'Vui lòng chọn chức vụ!'
                 
              }]}
             >
                 <Select 
                 allowClear
                 placeholder="Chọn chức vụ">
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
        )
    :(<div><Result
        status="403"
        title={ <h1 className="text-3xl font-bold text-center text-red-500 uppercase my-4">
          403 Lỗi phân quyền
        </h1>}
        subTitle="Rất tiếc, bạn không được phép truy cập trang này."
        // extra={<Button href="/" type="primary">Về Trang Chủ</Button>}
      /></div>)
    }
           
      
    </div>
  )
}

export default AddUser