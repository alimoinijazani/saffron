import Layout from '@/components/Layout';
import { enToper } from '@/utils/enToper';
import { getError } from '@/utils/error';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export default function OrderHistoryScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  return (
    <Layout title="Order History">
      <h1 className="mb-4 text-xl">سفارشات</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border">
              <tr>
                <th className="px-5 text-left border border-indigo-400">
                  {' '}
                  آیدی
                </th>
                <th className="p-5 text-right border border-indigo-400">
                  تاریخ
                </th>
                <th className="p-5 text-right border border-indigo-400">جمع</th>
                <th className="p-5 text-right border border-indigo-400">
                  پرداخت
                </th>
                <th className="p-5 text-right border border-indigo-400">
                  ارسال
                </th>
                <th className="p-5 text-right border border-indigo-400"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className=" p-5 border border-indigo-400">
                    {order._id.substring(20, 24)}
                  </td>
                  <td className=" p-5 border border-indigo-400">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className=" p-5 border border-indigo-400">
                    {enToper(order.totalPrice)}
                  </td>
                  <td className=" p-5 border border-indigo-400">
                    {order.isPaid
                      ? `${order.paidAt.substring(0, 10)}`
                      : 'پرداخت نشده'}
                  </td>
                  <td className=" p-5 border border-indigo-400">
                    {order.isDelivered
                      ? `${order.deliveredAt.substring(0, 10)}`
                      : 'ارسال نشده'}
                  </td>
                  <td className=" p-5 border border-indigo-400">
                    <Link href={`/order/${order._id}`} passHref></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
