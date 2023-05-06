import Layout from '@/components/Layout';
import ProductItem from '@/components/ProductItem';
import Slider from '@/components/slider';
import Product from '@/models/Product';
import { Store } from '@/utils/Store';

import db from '@/utils/db';
import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';

export default function Home({ products, featuredProducts }) {
  //slider

  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('کالا مورد نظر موجودی کافی ندارد');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.success('کالا به سبد اضافه شد');
  };
  console.log(featuredProducts);
  return (
    <Layout>
      <Slider featuredProducts={featuredProducts} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  };
}
