import Layout from '@/components/Layout';
import data from '@/utils/data';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function ProductScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product Not Found</div>;
  }
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
            <li>طبقه بندی: {product.category}</li>
            <li>برند: {product.brand}</li>
            <li>
              امتیاز: {product.rating} از {product.numReviews}
            </li>
            <li>توضیحات: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>قیمت مصرف کننده</div>
              <div>{product.price} تومان</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>وضعیت</div>
              <div>{product.countInStock > 0 ? 'موجود' : 'ناموجود'}</div>
            </div>
            <button className="primary-button w-full" type="button">
              افزودن به سبد
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
