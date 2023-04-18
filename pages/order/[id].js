import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../../utils/error';
import Link from 'next/link';
import Image from 'next/image';
import { enToper } from '@/utils/enToper';
// import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };
    default:
      return state;
  }
};

function OrderScreen() {
  //   const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { query } = useRouter();
  const { id: orderId } = query;
  const [{ loading, error, order, successPay }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      order: {},
      error: '',
    }
  );
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });

        toast.error(getError(err));
      }
    };
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
    } else {
      //   const loadPaypalScript = async () => {
      //     const { data: clientId } = await axios.get('/api/keys/paypal');
      //     paypalDispatch({
      //       type: 'resetOptions',
      //       value: {
      //         'client-id': clientId,
      //         currency: 'USD',
      //       },
      //     });
      //     paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      //   };
      //   loadPaypalScript();
    }
  }, [order, orderId, successPay]);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  //   function createOrder(data, actions) {
  //     return actions.order
  //       .create({
  //         purchase_units: [
  //           {
  //             amount: { value: totalPrice },
  //           },
  //         ],
  //       })
  //       .then((orderID) => {
  //         return orderID;
  //       });
  //   }

  //   function onApprove(data, actions) {
  //     return actions.order.capture().then(async function (details) {
  //       try {
  //         dispatch({ type: 'PAY_REQUEST' });
  //         const { data } = await axios.put(
  //           `/api/orders/${order._id}/pay`,
  //           details
  //         );
  //         dispatch({ type: 'PAY_SUCCESS', payload: data });
  //         toast.success('Order is paid successgully');
  //       } catch (err) {
  //         dispatch({ type: 'PAY_FAIL', payload: getError(err) });
  //         toast.error(getError(err));
  //       }
  //     });
  //   }
  //   function onError(err) {
  //     toast.error(getError(err));
  //   }

  return (
    <Layout title={` ${orderId} سفارش`}>
      <h1 className="mb-4 text-lg">{`سفارش ${orderId}`}</h1>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">آدرس</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </div>
              {isDelivered ? (
                <div className="alert-success"> {deliveredAt} تحویل در</div>
              ) : (
                <div className="alert-error">تحویل نشده</div>
              )}
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">نحوه پرداخت</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success"> {paidAt} پرداخت در</div>
              ) : (
                <div className="alert-error">پرداخت نشده</div>
              )}
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">روش پرداخت</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success"> {paidAt} پرداخت در</div>
              ) : (
                <div className="alert-error">پرداخت نشده</div>
              )}
            </div>

            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">اقلام سفارش</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-right">کالا</th>
                    <th className="    p-5 text-right">تعداد</th>
                    <th className="  p-5 text-right">قیمت واحد </th>
                    <th className="p-5 text-right">جمع</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </Link>
                      </td>
                      <td className=" p-5 text-right">
                        {enToper(item.quantity)}
                      </td>
                      <td className="p-5 text-right">
                        {enToper(item.price)} تومان
                      </td>
                      <td className="p-5 text-right">
                        {enToper(item.quantity * item.price)} تومان
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">خلاصه سفارش</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>کالاها</div>
                    <div>{enToper(itemsPrice)} تومان</div>
                  </div>
                </li>{' '}
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>مالیات</div>
                    <div>{enToper(taxPrice)} تومان</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>هزینه ارسال</div>
                    <div>{enToper(shippingPrice)} تومان</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>جمع</div>
                    <div>{enToper(totalPrice)} تومان</div>
                  </div>
                </li>
                {!isPaid && (
                  <li>
                    {/* {isPending ? (
                      <div>Loading...</div>
                    ) : (
                      <div className="w-full">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <div>Loading...</div>} */}
                  </li>
                )}
                {/* {session.user.isAdmin && order.isPaid && !order.isDelivered && (
                  <li>
                    {loadingDeliver && <div>Loading...</div>}
                    <button
                      className="primary-button w-full"
                      onClick={deliverOrderHandler}
                    >
                      Deliver Order
                    </button>
                  </li>
                )} */}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
OrderScreen.auth = true;

export default OrderScreen;
