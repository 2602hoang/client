import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { URL } from '../../url';
import { Button, Card, Modal, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, InfoCircleFilled } from '@ant-design/icons';
import CountUp from 'react-countup';
import { Column, Pie } from '@ant-design/charts';
import { type } from '@testing-library/user-event/dist/type';
import { AuthContext } from '../../contexts/AuthContextProvider';

function ThongkeOrderThanhCong() {
  const [orderTC, setOrderTC] = useState({});
  const [orderHuy, setOrderHuy] = useState({});
  const [orderThatBai, setOrderThatBai] = useState({});
  const [open, setOpen] = useState(false);
  const {userToken} = useContext(AuthContext);
  const getOrderThanhCong = async () => {
    try {
      const response = await axios.get(`${URL}api/v1/thongke/order/thanhcong`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          },
        }
      );
      setOrderTC(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrderHuy = async () => {
    try {
      const response = await axios.get(`${URL}api/v1/thongke/order/huy`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          },
        }
      );
      setOrderHuy(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrderThatBai = async () => {
    try {
      const response = await axios.get(`${URL}api/v1/thongke/order/thatbai`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          },
        }
      );
      setOrderThatBai(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrderHuy();
    getOrderThatBai();
    getOrderThanhCong();
  }, [userToken]);

  const totalPriceTC = orderTC.totalRevenue || 0;
  const totalQuantityTC = orderTC.totalQuantity || 0;
  const totalOrderTC = orderTC.successfulOrders || 0;

  const totalPriceHuy = orderHuy.totalRevenue || 0;
  const totalQuantityHuy = orderHuy.totalQuantity || 0;
  const totalOrderHuy = orderHuy.successfulOrders || 0;

  const totalPriceThatBai = orderThatBai.totalRevenue || 0;
  const totalQuantityThatBai = orderThatBai.totalQuantity || 0;
  const totalOrderThatBai = orderThatBai.successfulOrders || 0;

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const chartData = [
    {
      type: 'Tổng Giao dịch',
      VND: totalPriceTC + totalPriceHuy + totalPriceThatBai,
    },
    {
      type: 'Doanh thu',
      VND: totalPriceTC,
    },
    {
      type: 'Giao dịch Hủy',
      VND: totalPriceHuy,
    },
    {
      type: 'Giao dịch Thất bại',
      VND: totalPriceThatBai,
    },
    // {
    //   type: 'Doanh thu',
    //   VND: totalPriceTC - (totalPriceHuy + totalPriceThatBai),
    // }
  ];
  const config = {
    data: chartData,
    xField: 'type',
    yField: 'VND',
    label: {
      // position: 'middle',
      content: ({ VND }) => <CountUp end={VND} duration={2} separator="," />,
      style: {
        fill: type === "Giao dịch Hủy" || type === "Giao dịch Thất bại" ? "#111" : "#fff",
        opacity: 0.8,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: { alias: 'Loại đơn hàng' },
      VND: { alias: 'Doanh thu (VND)' },
    },
    color: ({ type }) => {
      if (type === 'Giao dịch Thành công') {
        return '#5e85ed';
      }
      if (type === 'Giao dịch Hủy' || type === 'Giao dịch Thất bại') {
        return '#cf1322';
      }
      if (type === 'Doanh thu') {
        return '#3f8600';
      }
      return '#000000';
    },
  };

  const detailedChartData = [
    {
      type: 'Thành công',
      VND: totalPriceTC,
    },
    {
      type: 'Hủy/Thất bại',
      VND: totalPriceHuy+totalPriceThatBai,
    },
    
  ];

  const detailedConfig = {
    data: detailedChartData,
    xField: 'type',
    yField: 'VND',
    label: {
      content: ({ VND }) => <CountUp end={VND} duration={2} separator="," />,
      style: ({ type }) => ({
        fill: type === "Hủy" || type === "Thất bại" ? "#cf1322" : "#3f8600",
        opacity: 0.6,
      }),
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: { alias: 'Loại đơn hàng' },
      VND: { alias: 'Số lượng (sản phẩm)' },
    },
    color: ({ type }) => {
      if (type === 'Thành công') {
        return '#5e85ed';
      }
      if (type === 'Hủy' || type === 'Thất bại') {
        return '#cf1322';
      }
      return '#000000';
    },
  };

  // 
  const donutChartData = [
    {
      type: 'Thành công',
      value: totalOrderTC,
    },
    {
      type: 'Hủy',
      value: totalOrderHuy,
    },
    {
      type: 'Thất bại',
      value: totalOrderThatBai,
    },
  ];

  const donutConfig = {
    appendPadding: 10,
    data: donutChartData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      // type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: {
        visible: false,
      },
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Tỉ lệ thành công',
      },
    },
   
  };

  const TC =  Math.round(totalOrderTC/(totalOrderTC+totalOrderHuy+totalOrderThatBai)*100)
  const Huy = Math.round(totalOrderHuy/(totalOrderTC+totalOrderHuy+totalOrderThatBai)*100)
  const ThatBai = Math.round(totalOrderThatBai/(totalOrderTC+totalOrderHuy+totalOrderThatBai)*100)

  const donutChartData1 = [
    {
      type: '% Thành công',
      value: TC ,
    },
    {
      type: '% Hủy',
      value: Huy,
    },
    {
      type: '% Thất bại',
      value: ThatBai,
    },
  ];

  const donutConfig1 = {
    appendPadding: 10,
    data: donutChartData1,
    angleField: `value`,
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      // type: 'inner',
      offset: '-50%',
      content: ({ value }) => `${(value)}%`,
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: {
        visible: false,
      },
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: ({ value }) => `${(value)}%`,
      },
    },
   
  };

  return (
    <div className="flex justify-center p-4 space-x-5 w-full">
      <div className='w-full flex flex-col container'>

    
              <div className="flex h-auto md:h-screen w-11/12 md:flex-row flex-col md:w-11/12 md:space-x-2 space-y-3 md:space-y-0 justify-center items-center md:mx-5">
                  <div className='flex w-full flex-col justify-center items-center '>
                  <Card
                  type="inner"
                  className="w-96 h-auto bg-gray-100 shadow-md rounded-lg"
                  actions={[
                    <Button
                      onClick={showModal}
                      icon={<InfoCircleFilled />}
                      type="default"
                      className="text-blue-500"
                    >
                      Chi tiết
                    </Button>,
                  ]}
                  title="Tổng quan"
                  bordered={false}
                >
                  <Statistic
                    title="Tổng tiền giao dịch"
                    valueRender={() => <CountUp end={totalPriceTC + (totalPriceHuy + totalPriceThatBai)} duration={2} />}
                    valueStyle={{
                      color: '#111',
                    }}
                    suffix="VND"
                  />
                  <Statistic
                    title="Tổng tiền giao dịch Hủy và Thất bại"
                    valueRender={() => <CountUp end={ (totalPriceHuy + totalPriceThatBai)} duration={2} />}
                    valueStyle={{
                      color: '#111',
                    }}
                    suffix="VND"
                  />
                    <Statistic
                    title="Doanh thu"
                    valueRender={() => <CountUp end={totalPriceTC} duration={2} />}
                    valueStyle={{
                      color: '#111',
                    }}
                    suffix="VND"
                  />
                  <Statistic
                    title="Tỉ lệ thành công"
                    valueRender={() => <CountUp end={totalPriceTC /(totalPriceTC + totalPriceHuy + totalPriceThatBai)*100} duration={2} />}
                    valueStyle={{
                      color: '#111',
                    }}
                    suffix="%"
                  />
                  <Statistic
                    title="Tổng số đơn hàng bán ra"
                    valueRender={() => <CountUp end={totalOrderTC + totalOrderHuy + totalOrderThatBai} duration={2} />}
                  />
                  <Statistic
                    title="Tổng số sản phẩm đã bán ra"
                    valueRender={() => <CountUp end={totalQuantityTC + totalQuantityHuy + totalQuantityThatBai} duration={2} />}
                  />
                </Card>
                </div>
                    <div className='w-11/12 h-auto  md:w-full flex-col flex overflow-x-scroll md:overflow-x-hidden '>
                    {/* <h1 className='text-3xl font-bold  text-center text-red-500 uppercase my-4'>tất cả dòng tiền</h1> */}
                    <Column {...config} />
                    </div>
                </div>

      <div className='flex w-full md:h-screen h-auto justify-center items-center md:mx-5'>
      <div className=' justify-center items-center  h-[70vh] w-11/12 md:w-full  md:overflow-x-hidden overflow-x-scroll flex flex-col'>
          <h1 className='text-3xl font-bold  text-center text-red-500 uppercase my-4'>Tỉ lệ từng giao dịch %</h1>
            <Pie {...donutConfig1} />
         
          </div>

      </div>
      </div>
     
     
      
      <Modal
      width={window.innerWidth >= 768 ? "50%" : "80%"}
      title="Chi tiết giao dịch"
      className='justify-center items-center flex '
      open={open} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <div className='flex flex-col w-full md:w-full justify-center items-center h-auto'>
        <div className="flex md:flex-row flex-col space-x-4 mt-6">
          <Card title="Đơn hàng thành công" bordered={false} className="bg-white rounded-lg shadow-md">
            <Statistic
              title="Tiền vào"
              valueRender={() => <CountUp end={totalPriceTC} precision={2} duration={2} />}
              valueStyle={{
                color: '#3f8600',
              }}
              prefix={<ArrowUpOutlined />}
              suffix="VND"
            />
            <Statistic
              title="Tổng số sản phẩm bán ra"
              valueRender={() => <CountUp end={totalQuantityTC} duration={2} />}
              valueStyle={{
                color: '#3f8600',
              }}
              
            />
            <Statistic
              title="Tổng số đơn hàng bán ra"
              valueRender={() => <CountUp end={totalOrderTC} duration={2} />}
              valueStyle={{
                color: '#3f8600',
              }}
            />
          </Card>
          <Card title="Đơn hàng thất bại và hủy" bordered={false} className="bg-white rounded-lg shadow-md">
            <Statistic
              title="Hoàn tiền hủy"
              valueRender={() => <CountUp end={ totalPriceHuy} precision={2} duration={2} />}
              valueStyle={{
                color: '#cf1322',
              }}
              prefix={<ArrowDownOutlined />}
              suffix="VND"
            />
             <Statistic
              title="Hoàn tiền thất bại"
              valueRender={() => <CountUp end={ totalPriceThatBai} precision={2} duration={2} />}
              valueStyle={{
                color: '#cf1322',
              }}
              prefix={<ArrowDownOutlined />}
              suffix="VND"
            />
            <Statistic
              title="Tổng số đơn hàng hủy "
              valueRender={() => <CountUp end={totalOrderHuy} duration={2} />}
              valueStyle={{
                color: '#cf1322',
              }}
            />
            <Statistic
              title="Tổng số đơn hàng thất bại"
              valueRender={() => <CountUp end={totalOrderThatBai} duration={2} />}
              valueStyle={{
                color: '#cf1322',
              }}
            />
            <Statistic
              title="Tổng số sản phẩm hoàn"
              valueRender={() => <CountUp end={totalQuantityHuy + totalQuantityThatBai} duration={2} />}
              valueStyle={{
                color: '#cf1322',
              }}
            />
          </Card>
        </div>
        <div className='container flex mt-2 flex-col justify-center items-center '>
        <h1 className='text-3xl font-bold text-center text-red-500 uppercase my-4'>Tổng số tiền tương ứng</h1>
          <Column {...detailedConfig} />
          </div>
          <div className='container flex flex-col mt-4 justify-center items-center'>
          <h1 className='text-3xl font-bold text-center text-red-500 uppercase my-4'>Tổng số đơn tương ứng</h1>
            <Pie {...donutConfig} />
         
          </div>
          </div>
      </Modal>
    </div>
  );
}

export default ThongkeOrderThanhCong;
