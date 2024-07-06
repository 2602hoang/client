import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URL } from '../url'
import { Alert,notification , Button, Form, Input, Select, Upload, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { PlusOutlined } from '@ant-design/icons'
import { formatCurrency, formattedTimestamp } from '../untils/index.js';

function UpdateProduct({ id_product, handleModalClose ,getAllProducts , getCategories , getBrands, brands ,categories}) {
    const [product, setProduct] = useState({});
   
    const [imageList, setImageList] = useState([]);
    

   

    const getOneProduct = async () => {
        try {
            const response = await axios.get(`${URL}api/v1/product/getone/${id_product}`);
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


 
    const handleUpdate = async (values) => {
        try {
            const response = await axios.put(`${URL}api/v1/product/update/${id_product}`, values);
            handleModalClose();
            
            getAllProducts();
            
            notification.success({
                message: 'Thành công',
                description: `Cập nhật sản phẩm thành công! ID: ${id_product}`,
            });
           
            
          
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    useEffect(() => {
        getOneProduct();
        getCategories();
        getBrands();
    }, [id_product]);

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handleImageChange = ({ fileList }) => setImageList(fileList);
    const handleSubmit = (values) => {
        const updatedProduct = {
            ...values,
            images: imageList.length > 0 ? imageList[0].url : '',
            // price: parseFloat(values.price.replace(/[^\d.-]/g, '')),
            // discoust: values.discoust / 100
        };
        handleUpdate(updatedProduct);
    };
    return (
        <div>
            {product && (
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    layout="horizontal"
                    // initialValues={{
                    //     name: product.name,
                    //     price: product.price,
                    //     category: product.id_category,
                    //     brand: product.id_brand,
                    //     qty: product.qty,
                    //     discoust: product.discoust
                    // }}
                    size="large"
                    className="w-full mx-5"
                    onFinish={handleSubmit}
                >
                    <Form.Item name="name" label="Tên Sách">
                        <TextArea placeholder={`${product.name}`} />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <TextArea placeholder={`${product.description}`} />
                    </Form.Item>


                    <Form.Item name="price" label="Giá">
                        <Input type='number' placeholder={formatCurrency(product.price)} />
                    </Form.Item>
                    <Form.Item name="id_category" label="Thể Loại">
                        <Select placeholder={`${product.category?.name}`}>
                            {categories.map((category) => (
                                <Select.Option key={category.id_category} value={category.id_category}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="id_brand" label="Quốc gia">
                        <Select placeholder={`${product.brand?.name}`}>
                            {brands.map((brand) => (
                                <Select.Option key={brand.id_brand} value={brand.id_brand}>
                                    {brand.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item  name="qty" label="Số Lượng Nhập">
                        <Input type='number' placeholder={`${product.qty}`} />
                    </Form.Item>
                    <Form.Item  name="discoust" label="Giảm Giá %">
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
                        <Button 
                        
                        type="primary" htmlType="submit">Sửa</Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    )
}

export default UpdateProduct
