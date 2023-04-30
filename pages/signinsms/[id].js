import Layout from '@/components/Layout';
import { getError } from '@/utils/error';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Notfound from '../notfound';

export default function LoginSms() {
  const { data: session } = useSession();
  const { query } = useRouter();
  const { id: mobile } = query;

  const [verifyCode, setVerifyCode] = useState('');
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [redirect, router, session]);
  const smsHandler = async () => {
    // const { data } = await axios.post('/api/sms/verify', {
    //   receptor: mobile,
    // });
    // data.message.substring(0, 7);
    setVerifyCode('1234567');
    console.log(verifyCode);
  };

  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm();
  const submitHandler = async ({ password }) => {
    try {
      await axios.post('/api/auth/signupsms', {
        mobile,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        mobile,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  if (mobile?.length === 11 && mobile?.startsWith('09')) {
    return (
      <Layout title="Login sms">
        <div className="mx-auto max-w-screen-sm">
          <h1 className="mb-4 text-lg">ورود</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            {/* <div className="mb-4">
            <label htmlFor="email" className="block text-center mb-2">
              ایمیل یا موبایل
            </label>
            <input
              type="text"
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
                  value:
                    /^09+[0-9]/ ||
                    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9_.+-]+$/i,
                  message: 'لطفا موبایل را بصورت صحیح وارد کنید',
                },
              })}
              className="w-full text-left text-ltr"
              id="email"
              autoFocus
            />
            {errors.mobile && (
              <div className="text-red-500">{errors.mobile.message}</div>
            )}
          </div> */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-center mb-2">
                کد ارسالی
              </label>
              <input
                type="text"
                className="w-full text-left text-ltr"
                id="password"
                {...register('password', {
                  required: 'لطفا کد خود را وارد کنید',
                  validate: (value) => value === verifyCode,
                  minLength: {
                    value: 6,
                    message: 'کد باید حداقل 5 کاراکتر داشته باشد',
                  },
                })}
              />
              {errors.password && (
                <div className="text-red-500 ">{errors.password.message}</div>
              )}
              {errors.password && errors.password.type === 'validate' && (
                <div className="text-red-500 ">کد اشتباه میباشد</div>
              )}
              <button
                type="button"
                className="primary-button"
                onClick={smsHandler}
              >
                دریافت کد
              </button>
            </div>
            <button type="submit" className="primary-button">
              ورود
            </button>
          </form>
        </div>
      </Layout>
    );
  }
  if (mobile?.includes('@')) {
    return (
      <Layout title="Login sms">
        <div className="mx-auto max-w-screen-sm">
          <h1 className="mb-4 text-lg">ورود</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            {/* <div className="mb-4">
            <label htmlFor="email" className="block text-center mb-2">
              ایمیل یا موبایل
            </label>
            <input
              type="text"
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
                  value:
                    /^09+[0-9]/ ||
                    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9_.+-]+$/i,
                  message: 'لطفا موبایل را بصورت صحیح وارد کنید',
                },
              })}
              className="w-full text-left text-ltr"
              id="email"
              autoFocus
            />
            {errors.mobile && (
              <div className="text-red-500">{errors.mobile.message}</div>
            )}
          </div> */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-center mb-2">
                پسورد
              </label>
              <input
                type="text"
                className="w-full text-left text-ltr"
                id="password"
                {...register('password', {
                  required: 'لطفا پسورد خود را وارد کنید',

                  minLength: {
                    value: 5,
                    message: 'کد باید حداقل 5 کاراکتر داشته باشد',
                  },
                })}
              />
              {errors.password && (
                <div className="text-red-500 ">{errors.password.message}</div>
              )}
            </div>
            <button type="submit" className="primary-button">
              ورود
            </button>
          </form>
        </div>
      </Layout>
    );
  } else {
    return <Notfound />;
  }
}
