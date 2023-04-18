import Layout from '@/components/Layout';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { getError } from '@/utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
export default function LoginScreen() {
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
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-sm"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-lg">ورود|ثبت نام</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-center mb-2">
            ایمیل
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'لطفا ایمیل خود را وارد کنید',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9_.+-]+$/i,
                message: 'لطفا ایمیل را بصورت صحیح وارد کنید',
              },
            })}
            className="w-full text-left text-ltr"
            id="email"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500 text-left">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-center mb-2">
            پسورد
          </label>
          <input
            type="password"
            className="w-full text-left text-ltr"
            id="password"
            {...register('password', {
              required: 'لطفا پسورد خود را وارد کنید',
              minLength: {
                value: 6,
                message: 'پسورد باید حداقل 5 کاراکتر داشته باشد',
              },
            })}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">ورود</button>
        </div>
        <div className="mb-4">
          حساب کاربری ندارید؟ &nbsp; <Link href="register">ثبت نام</Link>
        </div>
      </form>
    </Layout>
  );
}
