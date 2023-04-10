import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { BsCart3 } from 'react-icons/bs';
export default function Layout({ title, children }) {
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
      <div className="flex min-h-screen flex-col justify-between">
        <header className="">
          <nav className="flex px-4 h-12 justify-between items-center shadow-md">
            <div className="flex justify-center items-center">
              <Link href="/cart" className="p-2   border-r-2">
                <BsCart3 />
              </Link>
              <Link href="/login" className="p-2">
                ورود
              </Link>
            </div>
            <Link href="/" className="text-lg font-bold saffron-color">
              زعفران نطنز
            </Link>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          footer
        </footer>
      </div>
    </>
  );
}
