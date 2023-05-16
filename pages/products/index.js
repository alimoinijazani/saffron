import Layout from '@/components/Layout';
import Product from '@/models/Product';
import db from '@/utils/db';
import { enToper } from '@/utils/enToper';
import { getError } from '@/utils/error';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false, error: action.payload };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
}
export default function Products(props) {
  const { products, pages, page } = props;

  const filterSearch = ({ page }) => {
    const { query } = router;
    if (page) query.page = page;

    router.push({
      pathname: router.pathname,
      query: query,
    });
  };
  const pageHandler = (page) => {
    filterSearch({ page });
  };
  const router = useRouter();
  const [{ loading, error, successDelete }, dispatch] = useReducer(reducer, {
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
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchProducts();
    }
  }, [successDelete]);
  const createHandler = async () => {
    if (window.confirm('Are You Sure To Create?')) {
      try {
        dispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axios.post('/api/products', {});
        toast.success('Product Created Successfuly');
        dispatch({ type: 'CREATE_SUCCESS' });
        router.push(`/products/${data.product._id}`);
      } catch (err) {
        toast.error(getError(err));
      }
    }
  };
  const handleDelete = async (product) => {
    if (window.confirm('Are You Sure To Delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });

        await axios.delete(`/api/products/${product._id}`, {});
        toast.success('product delete successfuly');
        dispatch({ type: 'DELETE_SUCCESS' });
        filterSearch({ page });
      } catch (err) {
        toast.error(getError(err));
        dispatch({ type: 'DELETE_FAIL' });
      }
    }
  };
  return (
    <Layout title="Order History">
      <h1 className="mb-4 text-xl">محصولات</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <button className="primary-button mt-4" onClick={createHandler}>
            ایجاد محصول جدید
          </button>
          <table className="min-w-full ">
            <thead>
              <tr>
                <th className="px-1 text-right "> ردیف</th>
                <th className="px-4 text-right "> شناسه</th>
                <th className="p-4 text-right ">تاریخ</th>
                <th className="p-4 text-right ">نام</th>
                <th className="p-4 text-right ">موجودی</th>
                <th className="p-4 text-right ">گروه</th>
                <th className="p-4 text-right ">قیمت</th>
                <th className="p-4 text-right ">عملیات</th>
                <th className="p-4 text-right "></th>
              </tr>
            </thead>
            <tbody className="[&>*:nth-child(odd)]:bg-gray-50">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className=" p-2 ">
                    {enToper(
                      (page - 1) * PAGE_SIZE + products.indexOf(product) + 1
                    )}
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
                  <td>
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => handleDelete(product)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="flex">
            {products.length > 0 &&
              [...Array(pages).keys()].map((pageNumber) => (
                <li key={pageNumber}>
                  <button
                    className={`default-button m-2 ${
                      page == pageNumber + 1 ? 'font-bold' : ''
                    } `}
                    onClick={() => pageHandler(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </Layout>
  );
}
const PAGE_SIZE = 5;
export async function getServerSideProps({ query }) {
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  await db.connect();

  const productDocs = await Product.find({})
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({});

  await db.disconnect();
  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,

      page,
      pages: Math.ceil(countProducts / pageSize),
    },
  };
}
