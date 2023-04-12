import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import { enToper } from '@/utils/enToper';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const router = useRouter();
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">سبد خرید</h1>
      {cartItems.length === 0 ? (
        <div>
          سبد شما خالی است
          <br />
          <Link href="/"> برو به صفحه اصلی</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-right">کالا</th>
                  <th className="p-5 text-right">تعداد</th>
                  <th className="px-5 text-right">مبلغ</th>
                  <th className="p-5">حذف</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
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
                          responsive="true"
                        />
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {enToper(x + 1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">
                      {enToper(item.price)} تومان
                    </td>
                    <td className="p-5 text-center">
                      <button
                        onClick={() => removeItemHandler(item)}
                        type="button"
                      >
                        <BsTrashFill className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl flex justify-between">
                  <div>
                    جمع جز({cartItems.reduce((a, c) => a + c.quantity, 0)}):
                  </div>{' '}
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}{' '}
                  تومان
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('login?redirect=/shipping')}
                  className="primary-button w-full"
                >
                  ثبت سفارش
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
