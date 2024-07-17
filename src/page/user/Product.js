
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { URL } from '../../url';
import axios from 'axios';
import { formatCurrency, } from '../../untils/index.js';
import { Image, Select, Input, Drawer, notification } from 'antd';
// import { useCart } from '../../contexts/CartProvider.js';
import { AuthContext } from '../../contexts/AuthContextProvider.js';
// import { Option } from 'antd/es/mentions';

const { Option } = Select;
const { Search } = Input;
function Product() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const [productResponse, brandResponse, categoryResponse] = await Promise.all([
          axios.get(`${URL}api/v1/product/getall`),
          axios.get(`${URL}api/v1/brand/getall`),
          axios.get(`${URL}api/v1/category/getall`)
        ]);
        setProducts(productResponse.data);
        setBrands(brandResponse.data);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);
 
  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category.id_category === selectedCategory);
    }

    if (selectedBrand) {
      filtered = filtered.filter(product => product.brand.id_brand === selectedBrand);
    }

    if (searchTerm) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedBrand, searchTerm, products]);

  const handleSearch = useCallback((value) => {
    setSearchTerm(value.trim());
  }, []);

 
  

 
  const [open, setOpen] = useState(false);
  const showDrawer = useCallback((product) => {
    setSelectedProduct(product);
    setOpen(true);
  }, []);
  const onClose = useCallback(() => {
    setOpen(false);
    setSelectedProduct(null);
  }, []);
  // console.log(selectedProduct);


  const { addToCart } = useContext(AuthContext);
  const handleAddToCart = (product) => {
    // if(product.stock <)
    addToCart(product);
  };
  return (
    <Layout>
      <div className='text-center w-full font-black overflow-hidden mt-[65px] px-2'>

        <div data-aos="fade-left" className='flex gap-6 flex-col  w-10/12  md:w-full relative mb-auto justify-end items-end  '>
          <p className='text-xl font-medium'>Tìm theo thể loại hoặc quốc gia</p>
          <div className='flex w-full gap-6 justify-end items-end'>
            <Select
              placeholder="Chọn thể loại"
              onChange={value => setSelectedCategory(value)}
              style={{ width: 200 }}
              allowClear
            >
              <Option value="">Tất cả</Option>
              {categories.map((category) => (
                <Option key={category.id_category} value={category.id_category}>
                  {category.name}
                </Option>
              ))}
            </Select>
            <Select
              placeholder="Chọn quốc gia"
              onChange={value => setSelectedBrand(value)}
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
              allowClear
            />
          </div>
        </div>

        <div  className="grid md:grid-cols-4 grid-cols-1 gap-4 md:w-full h-auto min-h-screen w-11/12 justify-center items-center
     ml-2 my-3 font-mono md:ml-0" >
          {filteredProducts.map((product) => (
            <div
data-aos="flip-left"

              key={product.id_product}
              className="flex flex-col bg-white w-full font-mono space-y-8 h-[500px] rounded-md py-4  border-2"
            >

              <div
                // style={{backgroundImage: `url(${product.images })`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}
                class="flex flex-col bg-white w-full h-[550px] overflow-hidden justify-center items-center rounded-md py-4 px-6 ">
                <div className='flex flex-col h-[450px]'>
                  <p className="text-sm text-gray-500 pb-3"> <span className='font-semibold text-xl text-yellow-500'>{formatCurrency(product.price)}</span></p>
                  <p className="text-sm text-gray-500 pb-3">
                    Giảm Giá: {parseFloat(product.discoust) === 0 || parseFloat(product.discoust) > 100 ? 'Không có giảm giá' : `${(parseFloat(product.discoust) / 100 * 100)} %`}
                  </p>
                  <h3 class="text-center font-bold my-2 text-gray-800  w-full  ">"{product.name}"</h3>
                  <h3 className="text-start text-base font-light text-gray-900">Thể Loại: {product.category.name}</h3>
                  <h3 className="text-start text-base font-light text-gray-900">Quốc gia: {product.brand.name}</h3>
                </div>

                <div class="flex gap-2 text-sm text-gray-500 border-b my-2 justify-center items-center  border-2 w-[100px] h-[100px] pb-2">
                  <Image src={product.images} width={100} height={100} className='text-center justify-center items-center' />
                </div>
                <h3 className="text-start text-base font-light text-gray-900">Số lượng: {product.stock} (quyển)</h3>
              </div>
              <div class="flex justify-around items-center  h-1/12">
                <div class="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none">
                    <path d="m21.56 10.738-1.35-1.58c-.25-.3-.46-.86-.46-1.26v-1.7c0-1.06-.87-1.93-1.93-1.93h-1.7c-.4 0-.97-.21-1.27-.46l-1.58-1.35c-.69-.59-1.82-.59-2.51 0l-1.6 1.35c-.3.25-.86.46-1.26.46H6.17c-1.06 0-1.93.87-1.93 1.93v1.7c0 .39-.2.95-.45 1.25l-1.35 1.59c-.58.7-.58 1.82 0 2.5l1.35 1.59c.25.29.45.86.45 1.25v1.71c0 1.06.87 1.93 1.93 1.93h1.74c.39 0 .96.21 1.26.46l1.58 1.35c.69.59 1.82.59 2.51 0l1.58-1.35c.3-.25.86-.46 1.26-.46h1.7c1.06 0 1.93-.87 1.93-1.93v-1.7c0-.4.21-.96.46-1.26l1.35-1.58c.61-.68.61-1.81.02-2.51Zm-10.31-2.61c0-.41.34-.75.75-.75s.75.34.75.75v4.83c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-4.83Zm.75 8.74c-.55 0-1-.45-1-1s.44-1 1-1c.55 0 1 .45 1 1s-.44 1-1 1Z" fill="#ff8a65"></path></svg>
                  <button class="font-semibold text-sm text-red-700"
                  onClick={() => showDrawer(product)}>Mô tả</button>
                </div>
                {product.stock > 0 ?
                <div class="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none"><path d="M19.24 5.579h-.4l-3.38-3.38a.706.706 0 0 0-.99 
                            0c-.27.27-.27.71 0 .99l2.39 2.39H7.14l2.39-2.39c.27-.27.27-.71 0-.99a.706.706 0 0 0-.99 0l-3.37 3.38h-.4c-.9 0-2.77 0-2.77 2.56 0 .97.2 1.61.62 
                            2.03.24.25.53.38.84.45.29.07.6.08.9.08h15.28c.31 0 .6-.02.88-.08.84-.2 1.48-.8 1.48-2.48 0-2.56-1.87-2.56-2.76-2.56ZM19.09 12H4.91c-.62 0-1.09.55-.99
                             1.16l.84 5.14c.28 1.72 1.03 3.7 4.36 3.7h5.61c3.37 0 3.97-1.69 4.33-3.58l1.01-5.23a.997.997 0 0 0-.98-1.19Zm-4.21 4.05-3.25 3c-.14.13-.32.2-.51.2s-.38-.07-.53-.22l-1.5
                             -1.5a.754.754 0 0 1 0-1.06c.3-.29.77-.29 1.07 0l.99.99 2.72-2.51c.3-.28.78-.26 1.06.04.28.31.26.78-.05 1.06Z" fill="#32bfdb"></path></svg>
                
                  <button onClick={() => 
                   { handleAddToCart(product)
                    notification.success({
                      message: "Đã thêm sản phẩm vào giỏ hàng",
                      description: `Đã thêm "${product.name}" vào giỏ hàng`
                    })}
                    
                    } class="font-semibold text-sm text-[#32bfdb]">Thêm giỏ hàng</button>
                 
                </div> :(<h1>Đã hết hàng</h1>)}
                {selectedProduct && (
                <Drawer placement='left' title={`Chi tiết sách ( ${selectedProduct.name} )`} width={window.innerWidth >= 768 ? "500px" : '100%'} onClose={onClose} visible={selectedProduct !== null} footer={null}>
         
            <div className='justify-center items-center flex flex-col space-y-5'>
             <h1 class="text-center font-bold my-2 text-gray-800  w-full  ">{selectedProduct.name}</h1>
              <p>{selectedProduct.description}</p>
              <Image src={selectedProduct.images} width={300} height={300} className='text-center justify-center items-center border-2 rounded-3xl' />
                 <div class="flex justify-center items-center overflow-x-hidden text-gray-600 hover:scale-110 mt-5 hover:cursor-pointer ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M19.24 5.579h-.4l-3.38-3.38a.706.706 0 0 0-.99 
                            0c-.27.27-.27.71 0 .99l2.39 2.39H7.14l2.39-2.39c.27-.27.27-.71 0-.99a.706.706 0 0 0-.99 0l-3.37 3.38h-.4c-.9 0-2.77 0-2.77 2.56 0 .97.2 1.61.62 
                            2.03.24.25.53.38.84.45.29.07.6.08.9.08h15.28c.31 0 .6-.02.88-.08.84-.2 1.48-.8 1.48-2.48 0-2.56-1.87-2.56-2.76-2.56ZM19.09 12H4.91c-.62 0-1.09.55-.99
                             1.16l.84 5.14c.28 1.72 1.03 3.7 4.36 3.7h5.61c3.37 0 3.97-1.69 4.33-3.58l1.01-5.23a.997.997 0 0 0-.98-1.19Zm-4.21 4.05-3.25 3c-.14.13-.32.2-.51.2s-.38-.07-.53-.22l-1.5
                             -1.5a.754.754 0 0 1 0-1.06c.3-.29.77-.29 1.07 0l.99.99 2.72-2.51c.3-.28.78-.26 1.06.04.28.31.26.78-.05 1.06Z" fill="#32bfdb"></path></svg>
                  <button onClick={() => {
                    handleAddToCart(selectedProduct)
                    onClose()
                    notification.success({
                      message: "Đã thêm sản phẩm vào giỏ hàng",
                      description: `Đã thêm "${selectedProduct.name}" vào giỏ hàng`
                    })
                   

                    }} class="font-semibold text-sm text-[#32bfdb]">Thêm giỏ hàng</button>
                </div>
                </div>
                </Drawer>
              )}

              </div>

            </div>
          ))}
        </div>

      </div>





    </Layout>
  )
}

export default Product