import React, { useEffect, useState } from 'react';
import { URL } from '../../url';
import axios from 'axios';
import { Column, Pie } from '@ant-design/charts';
import CountUp from 'react-countup';
import { Button, DatePicker } from 'antd';
import { formatCurrency } from '../../untils';

function ThongkeUser() {
  const [totalUser, setTotalUser] = useState(0);
  const [totalUserActive, setTotalUserActive] = useState(0);
  const [totalUserNotActive, setTotalUserNotActive] = useState(0);

  const [usersWithMostOrders, setUsersWithMostOrders] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    }
  };

  const getUserLimit = async (start, end) => {
    try {
      const response = await axios.get(`${URL}api/v1/thongke/user/order/3`, {
        params: {
          start_date: start ? start.format('YYYY-MM-DD') : null,
          end_date: end ? end.format('YYYY-MM-DD') : null
        }
      });
      setUsersWithMostOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}api/v1/thongke/user/all`);
        setTotalUser(response.data.totalUsers);
        setTotalUserActive(response.data.activeUsers);
        setTotalUserNotActive(response.data.inactiveUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of the current week (Sunday)
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(today);
    endOfWeek.setDate(startOfWeek.getDate() + 7); // End of the current week (next Sunday)
    endOfWeek.setHours(23, 59, 59, 999);

    getUserLimit(startOfWeek, endOfWeek);
  }, []);

  const ACTIVE = Math.round((totalUserActive / totalUser) * 100);
  const NOT_ACTIVE = Math.round((totalUserNotActive / totalUser) * 100);

  const donutChartData1 = [
    {
      type: '% Hoạt động',
      value: ACTIVE,
    },
    {
      type: '% Khóa',
      value: NOT_ACTIVE,
    },
  ];

  const donutConfig1 = {
    appendPadding: 10,
    data: donutChartData1,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      offset: '-50%',
      content: ({ value }) => `${value}%`,
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
        content: ({ value }) => `${value}%`,
      },
    },
  };

  const chartData = [
    {
      type: 'Tổng số TK',
      TK: totalUser,
    },
    {
      type: 'TK hoạt động',
      TK: totalUserActive,
    },
    {
      type: 'TK khóa',
      TK: totalUserNotActive,
    },
  ];

  const config = {
    data: chartData,
    xField: 'type',
    yField: 'TK',
    label: {
      content: ({ TK }) => <CountUp end={TK} duration={2} separator="," />,
      style: {
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
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center w-full space-y-3 my-3">
        <h1 className="text-lg font-bold mb-2 text-center">
          Ba người dùng có số lượng đơn hàng lớn nhất
        </h1>
        <div className="flex justify-center items-center mt-4 flex-col space-y-3">
          <DatePicker.RangePicker
            format="YYYY-MM-DD"
            onChange={handleDateChange}
            placement="topLeft"
            placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
            value={[startDate, endDate]}
          />
          <Button type="primary" className="ml-2" onClick={() => getUserLimit(startDate, endDate)}>
            Xem kết quả
          </Button>
        </div>
        {/* Display user data */}
        <div className="mt-4">
          <ul className="flex flex-row gap-6 border-2 p-2">
            {usersWithMostOrders.length > 0 ? (
              usersWithMostOrders.map((user, index) => (
                <div  key={index}>
                  <h2 className="text-lg font-bold mb-2 text-center ">Kết quả {index + 1}</h2>
                  <li>
                    <p>
                      <strong>Người dùng :</strong> {user.user.username}
                    </p>
                    <p>
                      <strong>Số lượng đơn hàng:</strong> <CountUp end={user.orderCount} duration={2} separator="," />
                    </p>
                    <p>
                      <strong>Số tiền giao dịch:</strong> <CountUp end={user.totalSpent} duration={2} separator="," /> đ
                    </p>
                    <p>
                      <strong>Số điện thoại:</strong> 0<CountUp end={user.user.phone} duration={2} separator="," />
                      {/* {user.user.phone} */}
                    </p>
                  </li>
                </div>
              ))
            ) : (
              <p>Không có dữ liệu</p>
            )}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full md:gap-9 justify-center items-center container md:space-x-10">
        <div className="flex flex-col">
          <p>
            <strong>Tổng số tài khoản: <CountUp end={totalUser} duration={2} separator="," /> </strong>
          </p>
          <p>
            <strong>Tổng số tài khoản hoạt động: <CountUp end={totalUserActive} duration={2} separator="," /> </strong>
          </p>
          <p>
            <strong>Tổng số tài khoản khóa: <CountUp end={totalUserNotActive} duration={2} separator="," /> </strong>
          </p>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-center text-black uppercase my-4">Tổng Tài khoản</h1>
          <Column {...config} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-center text-black uppercase my-4">Tỉ lệ tài khoản</h1>
          <Pie data={donutChartData1} {...donutConfig1} />
        </div>
      </div>
    </div>
  );
}

export default ThongkeUser;
