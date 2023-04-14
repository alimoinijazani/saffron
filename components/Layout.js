import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { BsCart3 } from 'react-icons/bs';
import { Store } from '@/utils/Store';
import { enToper } from '@/utils/enToper';
import { ToastContainer } from 'react-toastify';
import { useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
export default function Layout({ title, children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { status, data: session } = useSession();
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  return (
    <>
      <Head>
        <title>
          {title
            ? title
            : 'Buy Pure Saffron Online - Best Quality Saffron Shop'}
        </title>
        <meta
          name="description"
          content="Looking to buy pure saffron online? Look no further than our saffron shop. We offer the best quality saffron sourced directly from trusted farmers. Our saffron is 100% pure and organic, with no additives or preservatives. Shop with us today for the finest saffron at competitive prices."
        />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <header className="">
          <nav className="flex px-4 h-12 justify-between items-center shadow-md">
            <Link href="/" className="text-lg font-bold saffron-color">
              زعفران نطنز
            </Link>
            <div className="flex justify-center items-center">
              {status === 'loading' ? (
                'loading'
              ) : session?.user ? (
                session.user.name
              ) : (
                <Link href="/login" className="p-2">
                  ورود
                </Link>
              )}

              <Link href="/cart" className="p-2 border-r-2 flex gap-0 ">
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white fontsize-1">
                    {enToper(cartItemsCount)}
                  </span>
                )}
                <BsCart3 />
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex flex-col h-20 justify-center items-center shadow-inner">
          <div>footer</div>
          <div>icons</div>
          <div>address</div>
        </footer>
      </div>
    </>
  );
}
