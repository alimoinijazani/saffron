import React, { useContext, useEffect, useState } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export default function Paymentmethod() {
  const methods = ['لینک پرداخت', 'کارت به کارت'];
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedPaymentMethod) {
      return toast.error('یکی از روش های پرداخت را انتخاب کنید');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );
    return router.push('/placeorder');
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    } else {
      setSelectedPaymentMethod(paymentMethod || '');
    }
  }, [paymentMethod, router, shippingAddress.address]);
  return (
    <Layout title="payment method">
      <CheckoutWizard activeStep={2} />
      <form onSubmit={handleSubmit}>
        <h1 className="mx-auto max-w-screen-md">روش های پرداخت</h1>
        {methods.map((m) => (
          <div key={m} className="m-4">
            <input
              name="paymentMethod"
              type="radio"
              id={m}
              className="p-2 outline-none focus:ring-0"
              value={m}
              checked={selectedPaymentMethod === m}
              onChange={() => setSelectedPaymentMethod(m)}
            />
            <label htmlFor={m} className="p-2">
              {m}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button type="submit" className="primary-button">
            مرحله بعد
          </button>
          <button
            type="button"
            onClick={() => router.push('/shipping')}
            className="default-button"
          >
            بازگشت
          </button>
        </div>
      </form>
    </Layout>
  );
}

Paymentmethod.auth = true;
