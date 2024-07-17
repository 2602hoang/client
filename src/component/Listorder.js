import React, { useContext, useEffect, useState } from 'react'
import { URL } from '../url'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContextProvider'
import { formatCurrency, formattedTimestamp } from '../untils'

function Listorder({ selectedOrderId }) {
    const [order, setOrder] = useState([])
  const {userId,userToken} = useContext(AuthContext)

  const getOneOrders = async () => {
    try {
      const response = await axios.get(`${URL}api/v1/order/getone/${userId}&${selectedOrderId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          },
        }
      )
      setOrder(response.data.order)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    if (selectedOrderId) {
        getOneOrders();
    }
  }, [selectedOrderId,userId,userToken])
//   console.log(order);
  const countItemsByIdSP = (orders) => {
    if (!Array.isArray(orders)) {
        throw new Error("The provided order is not an array");
    }

    const countMap = {};

    orders.forEach(orderItem => {
        if (orderItem.order_details && Array.isArray(orderItem.order_details)) {
            orderItem.order_details.forEach(detail => {
                if (detail.id_product) {
                    if (countMap[detail.id_product]) {
                        countMap[detail.id_product].count += detail.qty;
                        countMap[detail.id_product].total_amount += detail.total_amount;
                        // countMap[detail.product.name];
                    } else {
                        countMap[detail.id_product] = {
                            count: detail.qty,
                            total_amount: detail.total_amount,
                            name: detail.product.name,

                            price: detail.total_amount / detail.qty
                        };
                    }
                }
            });
        }
    });

    return countMap;
};
// {console.table(order);}
const itemCountsSP = countItemsByIdSP(order);
const idOrder = order.length > 0 ? order[0].id_order : null;
const total = order.length > 0 ? order[0].total_price : null;
const date = order.length > 0 ? order[0].date_order : null;
const note = order.length > 0 ? order[0].notes : null;

console.log(date);
// {console.table(itemCountsSP);}
  return (
    <div id="pdf-content" className='w-full mt-auto flex justify-center items-center h-auto'>
            <div className='border border-gray-800 flex-row w-[380px] overflow-hidden 
             justify-center h-auto items-center p-1 m-4 bg-white '>
                {idOrder && <p className='text-black font-mono'>ID Order: {idOrder}</p>}
                {note && <p className='border-b-2 mb-2 w-full'>Ghi chú: {note}</p>}
                {Object.keys(itemCountsSP).length > 0 && <p className='text-black font-black text-xl font-mono text-center'> CHi tiết hóa Đơn </p>}
                {date && <p className='text-black font-mono'>Thời gian: {formattedTimestamp(date)}</p>}
                {Object.keys(itemCountsSP).map((id, index) => (
                    <div key={index} className="mb-2  font-mono  flex-row border-b-2 border-dashed my-2">
                        <p className='font-semibold text-[#214f32]'>(SP{index + 1})  "{itemCountsSP[id].name}"</p>
                        <p className='text-end'>SL: {itemCountsSP[id].count}</p>
                        <p className='text-start'>Giá: {formatCurrency(itemCountsSP[id].price)}</p>
                        <p className='text-end mb-2'>Thành tiền: {formatCurrency(itemCountsSP[id].price * itemCountsSP[id].count)}</p>
                    </div>
                ))}
                {total && <p className='text-end text-black font-mono'>Tổng tiền: {formatCurrency(total)}</p>}
            </div>
        </div>
  )
}

export default Listorder