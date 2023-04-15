import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
export default function ShippingScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const setData = () => {
      setValue('fullname', shippingAddress.fullname);
      setValue('address', shippingAddress.address);
      setValue('city', shippingAddress.city);
      setValue('postalCode', shippingAddress.postalCode);
      setValue('mobile', shippingAddress.mobile);
    };
    setData();
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullname, address, city, postalCode, mobile }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullname, address, city, postalCode, mobile },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullname,
          address,
          city,
          postalCode,
          mobile,
        },
      })
    );
    router.push('/payment');
  };
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">آدرس</h1>
        <div className="mb-4">
          <label htmlFor="fullname">نام و نام خانوادگی</label>
          <input
            className="w-full"
            id="fullname"
            autoFocus
            {...register('fullname', {
              required: 'نام و نام خانوادگی را وارد کنید',
            })}
          />
          {errors.fullname && (
            <div className="text-red-500">{errors.fullname.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">آدرس کامل</label>
          <input
            className="w-full"
            id="address"
            autoFocus
            {...register('address', {
              required: 'آدرس وارد کنید',
              minLength: {
                value: 10,
                message: 'آدرس به صورت کامل وارد کنید',
              },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="city">شهر</label>
          <input
            className="w-full"
            id="city"
            autoFocus
            {...register('city', {
              required: 'please enter city',
            })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode"> کد پستی ده رقمی</label>
          <input
            className="w-full"
            id="postalCode"
            autoFocus
            {...register('postalCode', {
              required: 'کد پستی ده رقمی بدون خط تیره وارد کنید',
              minLength: {
                value: 10,
                message: 'کد پستی ده رقمی',
              },
              maxLength: {
                value: 10,
                message: 'کد پستی ده رقمی',
              },
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="mobile">موبایل تحویل گیرنده</label>
          <input
            className="w-full"
            id="mobile"
            autoFocus
            {...register('mobile', {
              required: 'موبایل خود را به صورت صحیح وارد کنید',
              minLength: {
                value: 11,
                message: 'موبایل خود را به صورت صحیح وارد کنید',
              },
              maxLength: {
                value: 11,
                message: 'موبایل خود را به صورت صحیح وارد کنید',
              },
              pattern: {
                value: /^09+[0-9]/,
                message: 'لطفا موبایل را بصورت صحیح وارد کنید',
              },
            })}
          />
          {errors.mobile && (
            <div className="text-red-500">{errors.mobile.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button type="submit" className="primary-button">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
}
ShippingScreen.auth = true;
