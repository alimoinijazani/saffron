import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import { enToper } from '@/utils/enToper';
import { getError } from '@/utils/error';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  const shippingPrice = itemsPrice < 0 ? 0 : 50000;
  const taxPrice = round2(itemsPrice * 0.09);
  const totalPrice = Math.round(itemsPrice + shippingPrice + taxPrice);
  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);
  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">ثبت سفارش</h1>
      {cartItems.length === 0 ? (
        <div>
          سبد خالی است <Link href="/">برو به صفحه اصلی</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">آدرس ارسال</h2>
              <div>
                {shippingAddress.fullname},{shippingAddress.address},{' '}
                {shippingAddress.city},{shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </div>
              <div>
                <Link href="/shipping">ویرایش</Link>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">نحوه پرداخت</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link href="/payment">ویرایش</Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">اقلام سفارش</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-right">کالا</th>
                    <th className="p-5 text-right">تعداد</th>
                    <th className="p-5 text-right">قیمت واحد</th>
                    <th className="p-5 text-right">جمع</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
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
                      <td className="p-5 text-right">
                        {enToper(item.quantity)}
                      </td>
                      <td className="p-5 text-right">{enToper(item.price)}</td>
                      <td className="p-5 text-right">
                        {enToper(item.quantity * item.price)}تومان
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/cart">ویرایش</Link>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="mb-2 text-lg">خلاصه سفارش</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>کالاها</div>
                  <div>{enToper(itemsPrice)} تومان</div>
                </div>
              </li>
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
              <li>
                <button
                  disabled={loading}
                  onClick={placeOrderHandler}
                  className="primary-button w-full"
                >
                  {loading ? 'Loading...' : 'ثبت سفارش'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}
PlaceOrderScreen.auth = true;
