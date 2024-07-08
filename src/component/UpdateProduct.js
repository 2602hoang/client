import React, { useContext, useEffect, useState } from 'react';
import { URL } from '../url';
import axios from 'axios';
import { Alert, Button, Form, Input, Select, Upload, message, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { formatCurrency } from '../untils/index.js';
import { AuthContext } from '../contexts/AuthContextProvider.js';

function UpdateProduct({ id_product, handleModalClose, getAllProducts, getCategories, getBrands, brands, categories }) {
    const [product, setProduct] = useState({});
    const [imageList, setImageList] = useState([]);
    const {userToken} = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = userToken;
                const response = await axios.get(`${URL}api/v1/product/getone/${id_product}`,
                    {headers: {"Authorization": `Bearer ${token}`}}
                );
                setProduct(response.data);
                // Format the initial image list
                if (response.data.images) {
                    setImageList([
                        {
                            uid: '-1',
                            name: 'image.png',
                            status: 'done',
                            url: response.data.images,
                        }
                    ]);
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
                setProduct({});
            }
        };

        fetchData();
    }, [id_product, userToken]);

    const handleUpdate = async (formData) => {
        try {
            const token = userToken;
            const response = await axios.put(`${URL}api/v1/product/update/${id_product}`, formData, {
                headers: { 
                    'Authorization': `Bearer ${token}`,'Content-Type': 'multipart/form-data' }
            });
            handleModalClose();
            getAllProducts();

            notification.success({
                message: 'Thành công',
                description: `Cập nhật sản phẩm thành công! ID: ${id_product}`,
            });
        } catch (error) {
            console.error('Error updating product:', error);
            notification.error({
                message: 'Lỗi',
                description: 'Đã xảy ra lỗi khi cập nhật sản phẩm.',
            });
        }
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handleImageChange = ({ fileList }) => {
        setImageList(fileList);
    };

    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append('name', values.name || product.name);
        formData.append('description', values.description || product.description);
        formData.append('id_brand', parseInt(values.id_brand) || product.id_brand);
        formData.append('id_category', parseInt(values.id_category) || product.id_category);
        formData.append('price', values.price || product.price);
        formData.append('qty', values.qty || product.qty);
        formData.append('discoust', values.discoust || product.discoust);
        
        if (imageList.length > 0 && imageList[0].originFileObj) {
            formData.append('images', imageList[0].originFileObj);
        }

        handleUpdate(formData);
    };

    return (
        <div>
            {product && (
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    layout="horizontal"
                    size="large"
                    className="w-full mx-5"
                    onFinish={handleSubmit}
                >
                    <Form.Item name="name" label="Tên Sản Phẩm">
                        <Input placeholder={product.name} />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea
                            autoSize={{ minRows: 5, maxRows: 8 }}
                            placeholder={product.description}
                        />
                    </Form.Item>
                    <Form.Item name="price" label="Giá">
                        <Input type='number' placeholder={formatCurrency(product.price)} />
                    </Form.Item>
                    <Form.Item name="id_category" label="Thể Loại">
                        <Select placeholder={product.category?.name}>
                            {categories.map((category) => (
                                <Select.Option key={category.id_category} value={category.id_category}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="id_brand" label="Nhãn Hiệu">
                        <Select placeholder={product.brand?.name}>
                            {brands.map((brand) => (
                                <Select.Option key={brand.id_brand} value={brand.id_brand}>
                                    {brand.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="qty" label="Số Lượng">
                        <Input type='number' placeholder={product.qty} />
                    </Form.Item>
                    <Form.Item name="discoust" label="Giảm Giá %">
                        <Input type='number' placeholder={parseFloat(product.discoust)} />
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
                    <Form.Item wrapperCol={{ offset: 4, span: 18 }}>
                        <Button type="primary" htmlType="submit">Cập nhật</Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
}

export default UpdateProduct;
