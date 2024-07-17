import { Column } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';
import { URL } from '../../url';
import axios from 'axios';
import CountUp from 'react-countup';

function Thongkeluotbanproduct() {
    const [productSales, setProductSales] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const getProductSales = async () => {
        try {
            const response = await axios.get(`${URL}api/v1/thongke/product/sales`);
            setProductSales(response.data);
            const total = calculateTotalQuantity(response.data);
            setTotalQuantity(total);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProductSales();
    }, []);

    const calculateTotalQuantity = (productSales) => {
        // Tính tổng số lượng sản phẩm bán ra từ dữ liệu fetched
        const total = productSales.reduce((sum, item) => sum + item.so_luong, 0);
        return total; // Trả về tổng số lượng sản phẩm bán ra
    };
    const config = {
        title: {
            visible: true,
            text: 'Biểu đồ thống kê sản phẩm bán ra',
        },
        forceFit: true,
        data: productSales, // Dữ liệu từ productSales
        xField: 'name', // Trường dữ liệu hiển thị trên trục x (tên sản phẩm)
        yField: 'so_luong', // Trường dữ liệu hiển thị trên trục y (số lượng đã bán)
        meta: {
            'name': { alias: 'Tên sản phẩm' }, // Alias cho trường name (tên sản phẩm)
            'so_luong': { alias: 'Số lượng đã bán' }, // Alias cho trường so_luong (số lượng đã bán)
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
        Tổng số lượng sản phẩm bán ra :<CountUp end={totalQuantity} duration={2} />
        </div>
    );
}

export default Thongkeluotbanproduct;
