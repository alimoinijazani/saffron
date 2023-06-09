import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { BsCart3 } from 'react-icons/bs';
import { Store } from '@/utils/Store';
import { enToper } from '@/utils/enToper';
import { ToastContainer } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { CgProfile } from 'react-icons/cg';
import { CiShoppingBasket } from 'react-icons/ci';
import { RxExit } from 'react-icons/rx';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';
import { CgProductHunt } from 'react-icons/cg';
import Footer from './footer';
export default function Layout({ title, children }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { status, data: session } = useSession();

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };
  const [query, setQuery] = useState('');

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };
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
            <form
              onSubmit={submitHandler}
              className="mx-auto  hidden w-full justify-center md:flex"
            >
              {' '}
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="rounded-tr-none rounded-br-none p-1 text-sm   focus:ring-0"
                placeholder="Search products"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none bg-red-300 p-1 text-sm dark:text-black"
                type="submit"
                id="button-addon2"
              >
                <FiSearch className="h-5 w-5"></FiSearch>
              </button>
            </form>
            <div className="flex justify-center items-center">
              {status === 'loading' ? (
                'loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600 ml-2">
                    <CgProfile className="scale-150" />
                  </Menu.Button>
                  <Menu.Items className="absolute left-0 w-56 origin-top-left shadow-lg bg-white rounded p-1 z-50">
                    <Menu.Item className="border-b">
                      <Link className="dropdown-link " href="/profile">
                        <CgProfile className="ml-2 " />{' '}
                        {session.user.name || session.user.image}
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link className="dropdown-link" href="/order-history">
                        <CiShoppingBasket className="ml-2" />
                        سفارش ها
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link className="dropdown-link" href="/products">
                        <CgProductHunt className="ml-2" />
                        محصولات
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        className="dropdown-link"
                        href="/#"
                        onClick={logoutClickHandler}
                      >
                        <RxExit className="ml-2" />
                        خروج
                      </Link>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
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
        <Footer />
      </div>
    </>
  );
}
