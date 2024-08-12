import React, { useContext, useEffect, useState } from 'react';
import { URL } from '../url';
import axios from 'axios';
import {  QuestionCircleOutlined } from '@ant-design/icons';
import {  Modal,Input, notification, Popconfirm, Select, Tooltip, Image } from 'antd';
import { formatCurrency, formattedTimestamp } from '../untils/index.js';
import UpdateProduct from './UpdateProduct.js';

import { AuthContext } from '../contexts/AuthContextProvider.js';

const { Option } = Select;
const { Search } = Input;
function ListProduct({ getBrands, getCategories, brands, categories }) {
  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');

  const [selectedBrand, setSelectedBrand] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const {userToken,userId} = useContext(AuthContext);
  const getAllProducts = async () => {
    try {
      const token = userToken;
      const response = await axios.get(`${URL}api/v1/product/getall/all`,{
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setProducts([]);
    }
  };

 

  useEffect(() => {
    getAllProducts();
    getBrands();
    getCategories();
    
  }, [userToken]);
  

  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category.id_category === selectedCategory);
    }

    if (selectedBrand) {
      filtered = filtered.filter(product => product.brand.id_brand === selectedBrand);
    }
    if (selectedStatus !== '') {
      filtered = filtered.filter(product => product.status.toString() === selectedStatus);
    }
    if (searchTerm) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedStatus,selectedBrand, searchTerm, products,]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };
  const handleSearch = (value) => {
    setSearchTerm(value.trim()); 
  };
  // console.log(userRole);
  // console.log(setSelectedProduct);
  const handleDelete = async (id_product) => {
    try {
      // const id_product = setSelectedProduct.id_product;
      const token = userToken;
      await axios.put(`${URL}api/v1/product/delete/${id_product}`,{
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      notification.warning({
        message: 'Thành công',
        description: `Ngưng kinh doanh sản phẩm! ID: ${id_product}`,
        showProgress: true,
        duration: 1.5,
      });
      getAllProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleReStock = async (id_product) => {
    try {
      const token = userToken;
      await axios.put(`${URL}api/v1/product/restock/${id_product}`,{
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      notification.success({
        message: 'Thành Công',
        description: `Kinh doanh lại sản phẩm! ID: ${id_product}`,
        showProgress: true,
        duration: 1.5,
      });
      getAllProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedProduct(null);
    getAllProducts();
  };

//   const handleSearch = (value) => {
//     setSearchTerm(value);
//   };

  return (
    <div>
    {products.length > 0 ? (
        <div data-aos="fade-down-left" className='flex gap-6 flex-col px-6 w-full justify-end items-end mb-2'>
            <p className='text-xl font-medium'>Tìm theo thể loại hoặc quốc gia</p>
            <div className='flex flex-col md:flex-row w-full gap-6 justify-end items-end'>
                <Select
                    placeholder="Chọn thể loại"
                    onChange={ value => setSelectedCategory(value || '')}
                    style={{ width: 200 }}
                    allowClear
                >
                    <Option value=''>Tất cả</Option>
                    {categories.map((category) => (
                        <Option key={category.id_category} value={category.id_category}>
                            {category.name}
                        </Option>
                    ))}
                </Select>
                <Select
              placeholder="Chọn Trạng thái"
              onChange={value => setSelectedStatus(value|| '')}
              style={{ width: 200 }}
              allowClear
             
            >
              <Option valued="">Tất cả</Option>
              <Option value="false">Đang Bán</Option>
              <Option value="true">Ngưng Bán</Option>
            </Select>
                <Select
                    placeholder="Chọn quốc gia"
                    onChange={value => setSelectedBrand(value|| '')}
                    style={{ width: 200 }}
                    allowClear
                >
                    <Option value="">Tất cả</Option>
                    {brands.map((brand) => (
                        <Option key={brand.id_brand} value={brand.id_brand}>
                            {brand.name}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className='flex md:w-1/3 w-full'>
                <Search
                    placeholder="Tìm theo tên sản phẩm"
                    className="w-full"
                    onChange={e => handleSearch(e.target.value)}
                    enterButton
                />
            </div>
        </div>
    ) : (
      <h1 className='text-center md:text-5xl text-3xl justify-center 
      items-center mt-24 font-black'>(Quản lý mới xem được)</h1>
    )}
    <div  id="#list" className="grid md:grid-cols-4 grid-cols-1 gap-4 w-full
     mx-2 my-3 font-mono">
        {filteredProducts.map((product) => (
            <div
            data-aos="fade-down"
                key={product.id_product}
                className={`flex flex-col bg-white w-11/12 font-mono space-y-8 h-auto rounded-md py-4 px-6 border-2 ${product.status ===false ? 'border-green-500' : 'border-red-500'}`}
            >
                <div className='h-auto flex flex-col justify-start items-start'>
                    <div className='flex flex-row justify-center items-center'>
                        <Tooltip placement="bottom" title={product.description} color={"blue"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none"><path opacity=".4" d="M10.75 2.45c.7-.59 1.83-.59 2.51 0l1.58 1.35c.3.25.87.46 1.27.46h1.7c1.06 0 1.93.87 1.93 1.93v1.7c0 .4.21.96.46 1.26l1.35 1.58c.59.7.59 1.83 0 2.51l-1.35 1.58c-.25.3-.46.86-.46 1.26v1.7c0 1.06-.87 1.93-1.93 1.93h-1.7c-.4 0-.96.21-1.26.46l-1.58 1.35c-.7.59-1.83.59-2.51 0l-1.58-1.35c-.3-.25-.87-.46-1.26-.46H6.17c-1.06 0-1.93-.87-1.93-1.93v-1.71c0-.39-.2-.96-.45-1.25l-1.35-1.59c-.58-.69-.58-1.81 0-2.5l1.35-1.59c.25-.3.45-.86.45-1.25V6.2c0-1.06.87-1.93 1.93-1.93H7.9c.4 0 .96-.21 1.26-.46l1.59-1.36Z" fill="#fdc323"></path><path d="M12 16.871c-.55 0-1-.45-1-1s.44-1 1-1c.55 0 1 .45 1 1s-.44 1-1 1ZM12 13.719c-.41 0-.75-.34-.75-.75v-4.84c0-.41.34-.75.75-.75s.75.34.75.75v4.83c0 .42-.33.76-.75.76Z" fill="#fdc323"></path></svg>
                        </Tooltip>
                        <h3 className='text-base font-semibold text-gray-900'>Mô tả</h3>
                    </div>
                    <h3 className="text-base text-center font-semibold text-gray-900">Trạng thái: "{product.status === false ? 'Đang Bán' : 'Ngưng Bán'}"</h3>
                    <h3 className="text-center font-bold text-xl text-gray-800 pb-10 w-full overflow-hidden whitespace-nowrap text-overflow-ellipsis">{product.name}</h3>
                    <p className="text-sm text-gray-500 pb-3">Giá: <span className='font-semibold text-xl text-yellow-500'>{formatCurrency(product.price)}</span></p>
                    <p className="text-sm text-gray-500 pb-3">
                        Giảm Giá: {parseFloat(product.discoust) === 0 || parseFloat(product.discoust) > 100 ? 'Không có giảm giá' : `${(parseFloat(product.discoust) / 100 * 100)} %`}
                    </p>
                    <h3 className="text-base font-semibold text-gray-900">Thể Loại: {product.category.name}</h3>
                  
                    <h3 className="text-base font-semibold text-gray-900">Quốc gia: {product.brand.name}</h3>
                    <h3 className="text-base font-semibold text-gray-900">Số Lượng nhập: {product.stock>0 ? product.stock : 'Hết hàng'}</h3>
                    <p className="text-sm text-gray-500 pb-3">Ngày tạo: {formattedTimestamp(product.created_at)}</p>
                    <div className="flex gap-2 text-sm text-gray-500 border-b justify-center items-center pb-2">
                        <Image src={product.images} alt={product.name} style={{ width: 200, height: 200 }} />
                    </div>
                </div>
                {parseInt(userId) === 84 ? (
                    <div className=" flex justify-around items-center pt-3 h-auto  ">
                        <div className="grid gap-2 text-gray-600 hover:scale-110 pt-8 duration-200 grid-cols-1 w-full hover:cursor-pointer justify-center items-center ">
                            <Popconfirm
                                title={<h3 className='w-60'>Bạn Muốn chỉnh sửa: "{product.name}"</h3>}
                                onConfirm={() => handleEdit(product)}
                                icon={<QuestionCircleOutlined style={{ color: 'green' }} />}
                            >
                                <svg className="flex w-6 stroke-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                <button className=" flex font-semibold text-sm text-green-700">Sửa</button>
                            </Popconfirm>
                        </div>
                        {product.status === false ? (
                          
                        
                        <div className="grid gap-2 text-gray-600 hover:scale-110 pt-8 duration-200 grid-cols-1 w-full hover:cursor-pointer justify-center items-center ">
                            <Popconfirm
                                title={<h3 className='w-60'>Bạn muốn ngưng kinh doanh: "{product.name}"?</h3>}
                                onConfirm={() => handleDelete(product.id_product)}
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            >
                              <div className='flex flex-col items-center justify-center '>
                                <svg className=" w-6 stroke-red-700 " viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                                <button className=" font-semibold text-sm text-red-700">Ngưng Kinh Doanh</button>
                                </div>
                            </Popconfirm>
                        </div>)
                        :(
                        <div className="grid gap-2 text-gray-600 hover:scale-110 pt-8 duration-200 grid-cols-1 w-full hover:cursor-pointer justify-center items-center ">
                            <Popconfirm
                                title={<h3 className='w-60'>Bạn muốn kinh doanh lại: "{product.name}"?</h3>}
                                onConfirm={() => handleReStock(product.id_product)}
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            >
                              <div className='flex flex-col items-center justify-center '>
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path stroke="#37d67a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 16H5.43C3.14 16 2 14.86 2 12.57V5.43C2 3.14 3.14 2 5.43 2H10c2.29 0 3.43 1.14 3.43 3.43"></path><path stroke="#37d67a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.57 22H14c-2.29 0-3.43-1.14-3.43-3.43v-7.14C10.57 9.14 11.71 8 14 8h4.57C20.86 8 22 9.14 22 11.43v7.14c0 2.29-1.14 3.43-3.43 3.43zM14.87 15h3.26M16.5 16.63v-3.26"></path></svg>
                                <button className=" font-semibold text-sm text-green-700">Kinh doanh lại</button>
                                </div>
                            </Popconfirm>
                        </div>
                        )}
                    </div>
                 
                      ):<></>
                } 
                <Modal
                    title={<h1 className='text-center text-4xl font-bold border-b-2 pb-4'>Chỉnh Sửa Sản Phẩm</h1>}
                    className='overflow-hidden text-center w-1/2 h-min-screen'
                    width={window.innerWidth >= 768 ? "50%" : "100%"}
                    open={openModal && selectedProduct && selectedProduct.id_product === product.id_product}
                    onCancel={handleModalClose}
                    footer={null}
                >
                    {selectedProduct && selectedProduct.id_product === product.id_product && (
                        <UpdateProduct
                            categories={categories}
                            brands={brands}
                            getCategories={getCategories}
                            getBrands={getBrands}
                            id_product={selectedProduct.id_product}
                            getAllProducts={getAllProducts}
                            handleModalClose={handleModalClose}
                        />
                    )}
                </Modal>
            </div>
        ))}
    </div>
    </div>
  );
}

export default ListProduct;
