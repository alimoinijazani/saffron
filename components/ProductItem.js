/* eslint-disable @next/next/no-img-element */
import { enToper } from '@/utils/enToper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
          responsive="true"
          className="rounded shadow"
        ></Image>
        {/* <img
          src={product.image}
          alt={product.name}
          
        /> */}
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>{enToper(product.price)} تومان</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          افزودن به سبد
        </button>
      </div>
    </div>
  );
}
