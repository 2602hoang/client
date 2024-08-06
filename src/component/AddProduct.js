import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, Popconfirm, Select, Spin, Upload, message, notification } from 'antd';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { URL } from '../url';
import TextArea from 'antd/es/input/TextArea';
import { AuthContext } from '../contexts/AuthContextProvider';

function AddProduct({ navigateToList, handleModalClose, getAllProducts,getCategories ,getBrands, brands ,categories}) {
   
    const [imageList, setImageList] = useState([]);
    // const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const {userToken,userId} = useContext(AuthContext);


    // console.log(userId);

    

    useEffect(() => {
        getCategories();
        getBrands();
    }, [userToken,userId]);

    const addProduct = async (values) => {
        const formData = new FormData();
        formData.append('id_brand', parseInt(values.id_brand));
        formData.append('id_category', parseInt(values.id_category));
        formData.append('name', values.name);
        formData.append('description',values.description);
        formData.append('price', values.price);
        formData.append('stock', values.stock);
        formData.append('discoust', values.discoust || 0);
        
        if (imageList.length > 0) {
            formData.append('images', imageList[0].originFileObj);
        }

        try {
            const token = userToken;
            await axios.post(`${URL}api/v1/product/add`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            notification.success({
                message: 'Thành công',
                description: `Thêm sản phẩm thành công! `,
                showProgress: true,
                duration: 1.5,
            });
            form.resetFields();
            setImageList([]);
            getAllProducts();
            
        } catch (error) {
            console.error('Error adding product:', error);
            // notification.error({
            //     message: 'Lỗi',
            //     description: 'Có lỗi xảy ra khi thêm sản phẩm.',
            // });
        }
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handleImageChange = ({ fileList }) => setImageList(fileList);

    return (
        
            <div   className='flex font-mono justify-center items-center md:w-full w-full'>
           { parseInt(userId) === 84 ?(
            <Form
            data-aos="fade-down"
                form={form}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 10,
                }}
                layout="horizontal"
                initialValues={{
                    size: 'large',
                }}
                size="large"
                className='w-full mx-5'
                onFinish={addProduct}
            >
                <Form.Item name="name" label="Tên Sách" rules={[{ required: true, message: 'Vui lòng nhập tên sách!' }]}>
                    <TextArea allowClear autoSize={{
                            minRows: 2,
                            maxRows: 4,
                          }} />
                </Form.Item>
                <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập tên sách!' }]}>
                    <TextArea allowClear autoSize={{
                            minRows: 5,
                            maxRows: 8,
                          }} />
                </Form.Item>
                <Form.Item name="id_category" label="Thể loại" rules={[{ required: true, message: 'Vui lòng chọn thể loại!' }]}>
                    <Select allowClear placeholder="Chọn thể loại">
                        {categories.map((category) => (
                            <Select.Option key={category.id_category} value={category.id_category}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="id_brand" label="Quốc gia" rules={[{ required: true, message: 'Vui lòng chọn quốc gia!' }]}>
                    <Select allowClear placeholder="Chọn quốc gia">
                        {brands.map((brand) => (
                            <Select.Option key={brand.id_brand} value={brand.id_brand}>
                                {brand.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
                    <Input allowClear type="number" />
                </Form.Item>
                <Form.Item name="stock" label="Số lượng nhập" rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}>
                    <Input allowClear type="number" />
                </Form.Item>
                <Form.Item name="discoust" label="Giảm giá">
                    <Input allowClear type="number" />
                </Form.Item>
                <Form.Item label="Hình ảnh" name="images" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload
                        listType="picture-card"
                        fileList={imageList}
                        onChange={handleImageChange}
                        beforeUpload={() => false} // Prevent the upload automatically
                    >
                        {imageList.length < 1 && (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                    <Button type="primary" htmlType="submit">Thêm Sản Phẩm</Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 18 }}>
                   
                </Form.Item>
               
            </Form>
        )
        :
        (
            <div data-aos="fade-down" >(Quản Lý mới thêm được)</div>
        )
        }
        </div>
    );
}

export default AddProduct;
