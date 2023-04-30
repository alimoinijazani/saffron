import Layout from '@/components/Layout';
import Link from 'next/link';
import React from 'react';

export default function Notfound() {
  return (
    <Layout>
      <div className="flex-col justify-center items-center">
        <h1 className="text-xl">صفحه موجود نیست</h1>
        <Link href="/">بازگشت به صفحه اصلی</Link>
      </div>
    </Layout>
  );
}
