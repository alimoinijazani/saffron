import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import data from '@/utils/data';
import { enToper } from '@/utils/enToper';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);

  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert('کالا مورد نظر موجودی کافی ندارد');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            responsive="true"
          ></Image>
        </div>
        <div>
          <ul>
            <li className="text-lg">
              <h1>{product.name}</h1>
            </li>
            <li>
              <b> طبقه بندی:</b> {product.category}
            </li>
            <li>
              <b> برند:</b> {product.brand}
            </li>
            <li>
              <b> امتیاز:</b> {enToper(product.rating)} از{' '}
              {enToper(product.numReviews)}
            </li>
            <li>
              <b> توضیحات:</b> {product.description}
            </li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>قیمت مصرف کننده</div>
              <div>{enToper(product.price)} تومان</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>وضعیت</div>
              <div>{product.countInStock > 0 ? 'موجود' : 'ناموجود'}</div>
            </div>
            <button
              className="primary-button w-full"
              type="button"
              onClick={addToCartHandler}
            >
              افزودن به سبد
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
