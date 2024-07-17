import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URL } from '../../url';
import { Column } from '@ant-design/charts';
import CountUp from 'react-countup';

function ThongkehoanProduct() {

    const [productNoSales, setProductNoSales] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const getProductNoSales = async () => {
        try {
            const response = await axios.get(`${URL}api/v1/thongke/product/nosales`);
            setProductNoSales(response.data);
            const total = calculateTotalQuantity(response.data);
            setTotalQuantity(total);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProductNoSales();
    }, []);
    const calculateTotalQuantity = (productSales) => {
        // Tính tổng số lượng sản phẩm bán ra từ dữ liệu fetched
        const total = productSales.reduce((sum, item) => sum + item.so_luong, 0);
        return total; // Trả về tổng số lượng sản phẩm bán ra
    };

    const config = {
        title: {
            visible: true,
            text: 'tổng đơn hàng',
        },
        forceFit: true,
        data: productNoSales, // Use fetched data here
        xField: 'name',
        yField: 'so_luong',
        meta: {
            'product.name': { alias: 'Tên sản phẩm' }, // Alias for product name
            'Số lượng sản phảm bán ra': { alias: 'Số lượng đã bán' }, // Alias for total quantity sold
        },
        label: {
            visible: true,
            style: {
                fill: '#ffffcc',
                fontSize: 12,
                fontWeight: 600,
                opacity: 0.6,
            },
        },
    };

  return (
    <div className='flex justify-center items-center '>
    <Column {...config} />
    Tổng số lượng sản phẩm chờ hoàn : <CountUp end={totalQuantity} duration={2} />
    </div>
  )
}

export default ThongkehoanProduct