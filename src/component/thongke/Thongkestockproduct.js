import React, { useEffect, useState } from 'react'
import { URL } from '../../url';
import axios from 'axios';
import { Pie } from '@ant-design/charts';
import CountUp from 'react-countup';

function Thongkestockproduct() {
    const [productstock, setProductstock] = useState([]);

    const [dem,setDem] = useState(0)
    const getProductStock = async () => {
      try {
        const response = await axios.get(`${URL}api/v1/thongke/product/stock`);
        setProductstock(response.data.rows);
        setDem(response.data.count)
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      getProductStock();
    }, []);
  
    
  
    const config = {
      forceFit: true,
      title: {
        visible: true,
        text: 'Số lượng sản phẩm theo danh mục',
      },
      description: {
        visible: true,
        text: 'Biểu đồ thể hiện số lượng sản phẩm theo từng danh mục',
      },
      radius: 0.8,
      data: productstock.map(item => ({
        type: `(Id ${item.id_product})  ${item.name}  `,
        value: item?.stock,
        subType: item.name,
      })),
      angleField: 'value',
      colorField: 'type',
      label: {
        visible: false,
        // type: 'inner',
        formatter: (text, item) => {
          return `SL tồn kho ${item.value}`;
        },
      },
    };
  
  return (
    <div className='flex justify-center items-center '>
    <Pie {...config} />
    Số lượng sản phẩm tồn kho nhỏ hơn "<CountUp end={123} duration={2} />" là :  <CountUp end={dem} duration={2} /> 
    </div>
  )
}

export default Thongkestockproduct