import Layout from '@/components/Layout';

import { useSession } from 'next-auth/react';

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginSms() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [redirect, router, session]);

  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm();
  const submitHandler = ({ mobile }) => {
    router.push(`/signinsms/${mobile}`);
  };
  return (
    <Layout title="Login sms">
      <div className="mx-auto max-w-screen-sm">
        <h1 className="mb-4 text-lg">ورود</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-center mb-2">
              ایمیل یا موبایل
            </label>
            <input
              type="text"
              {...register('mobile', {
                required: 'لطفا این قسمت را خالی نگذارید',

                pattern: {
                  value:
                    /^09(?=.*\d)[\d]{9}|^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9_.+-]+$/i,
                  message: 'لطفا موبایل را بصورت صحیح وارد کنید',
                },
              })}
              className="w-full text-left text-ltr"
              id="mobile"
              autoFocus
            />
            {errors.mobile && (
              <div className="text-red-500">{errors.mobile.message}</div>
            )}
          </div>

          <div className="flex justify-center">
            <button type="submit" className="primary-button">
              ورود
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
