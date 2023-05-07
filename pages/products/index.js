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
      return { ...state, loading: false, products: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export default function Products() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products/list`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchProducts();
  }, []);
  return (
    <Layout title="Order History">
      <h1 className="mb-4 text-xl">محصولات</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full ">
            <thead>
              <tr>
                <th className="px-5 text-right "> ردیف</th>
                <th className="px-5 text-right "> شناسه</th>
                <th className="p-5 text-right ">تاریخ</th>
                <th className="p-5 text-right ">نام</th>
                <th className="p-5 text-right ">موجودی</th>
                <th className="p-5 text-right ">گروه</th>
                <th className="p-5 text-right ">قیمت</th>
                <th className="p-5 text-right ">عملیات</th>
              </tr>
            </thead>
            <tbody className="[&>*:nth-child(odd)]:bg-gray-50">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className=" p-2 ">
                    {enToper(products.indexOf(product) + 1)}
                  </td>
                  <td className=" p-5 ">{product._id.substring(20, 24)}</td>
                  <td className=" p-5 ">
                    {product.createdAt.substring(0, 10)}
                  </td>
                  <td className=" p-5 ">{product.name}</td>
                  <td className=" p-5 ">{product.countInStock}</td>
                  <td className=" p-5 ">{product.category}</td>
                  <td className="p-4">{product.price}</td>
                  <td className=" p-4 ">
                    <Link href={`/products/${product._id}`} passHref>
                      جزئیات
                    </Link>
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
