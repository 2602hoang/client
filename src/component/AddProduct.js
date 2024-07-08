import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Popconfirm, Select, Spin, Upload, message, notification } from 'antd';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { URL } from '../url';
import TextArea from 'antd/es/input/TextArea';

function AddProduct({ navigateToList, handleModalClose, getAllProducts,getCategories ,getBrands, brands ,categories}) {
   
    const [imageList, setImageList] = useState([]);
    // const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();



 

    

    useEffect(() => {
        getCategories();
        getBrands();
    }, []);

    const addProduct = async (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description',values.description);
        formData.append('id_category', parseInt(values.id_category));
        formData.append('id_brand', parseInt(values.id_brand));
        formData.append('price', values.price);
        formData.append('qty', values.qty);
        formData.append('discoust', values.discoust);
        
        if (imageList.length > 0) {
            formData.append('images', imageList[0].originFileObj);
        }

        try {
            await axios.post(`${URL}api/v1/product/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            notification.success({
                message: 'Thành công',
                description: `Thêm sản phẩm thành công! `,
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
        <div className='flex font-mono justify-center items-center md:w-full w-full'>
            {/* {contextHolder} */}
            <Form
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
                    <TextArea autoSize={{
                            minRows: 2,
                            maxRows: 4,
                          }} />
                </Form.Item>
                <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập tên sách!' }]}>
                    <TextArea autoSize={{
                            minRows: 5,
                            maxRows: 8,
                          }} />
                </Form.Item>
                <Form.Item name="id_category" label="Thể loại" rules={[{ required: true, message: 'Vui lòng chọn thể loại!' }]}>
                    <Select placeholder="Chọn thể loại">
                        {categories.map((category) => (
                            <Select.Option key={category.id_category} value={category.id_category}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="id_brand" label="Quốc gia" rules={[{ required: true, message: 'Vui lòng chọn quốc gia!' }]}>
                    <Select placeholder="Chọn quốc gia">
                        {brands.map((brand) => (
                            <Select.Option key={brand.id_brand} value={brand.id_brand}>
                                {brand.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="qty" label="Số lượng nhập" rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="discoust" label="Giảm giá">
                    <Input type="number" />
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
                    {/* <Popconfirm
                        title={`Bạn Muốn xem lại danh sách Sản Phẩm ?`}
                        onConfirm={() => 
                        {
                           
                            navigateToList()
                           
                        }
                            
                        }
                        icon={<QuestionCircleOutlined style={{ color: 'green' }} />}
                    > */}
                        
                      
                    {/* </Popconfirm> */}
                </Form.Item>
               
            </Form>
        </div>
    );
}

export default AddProduct;
