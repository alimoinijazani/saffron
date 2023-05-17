import React, { useContext, useState } from 'react';
import { Store } from '@/utils/Store';
import { enToper } from '@/utils/enToper';
import Layout from '@/components/Layout';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getError } from '@/utils/error';
// import Cookies from 'js-cookie';

export default function Cardpay() {
  const [cardNumber1, setCardNumber1] = useState('');
  const [cardNumber2, setCardNumber2] = useState('');
  const [cardNumber3, setCardNumber3] = useState('');
  const [cardNumber4, setCardNumber4] = useState('');
  const { query } = useRouter();
  const { id: orderId } = query;
  const router = useRouter();
  const { state } = useContext(Store);
  const { cart } = state;
  const { orderItems } = cart;

  const handleChange1 = (e) => {
    if (e.target.value.length === 4) {
      document.getElementById('cardNumber1').blur();
      document.getElementById('cardNumber2').focus();
    }
    if (e.target.value === '' || /^\d{1,4}$/.test(e.target.value))
      setCardNumber1(e.target.value);
  };
  const handleChange2 = (e) => {
    if (e.target.value.length === 4) {
      document.getElementById('cardNumber2').blur();
      document.getElementById('cardNumber3').focus();
    }
    if (e.target.value === '' || /^\d{1,4}$/.test(e.target.value))
      setCardNumber2(e.target.value);
  };
  const handleChange3 = (e) => {
    if (e.target.value.length === 4) {
      document.getElementById('cardNumber3').blur();
      document.getElementById('cardNumber4').focus();
    }
    if (e.target.value === '' || /^\d{1,4}$/.test(e.target.value))
      setCardNumber3(e.target.value);
  };
  const handleChange4 = (e) => {
    if (e.target.value === '' || /^\d{1,4}$/.test(e.target.value))
      setCardNumber4(e.target.value);
  };
  const [setLoading] = useState(false);
  const handlePay = async () => {
    try {
      setLoading(true);
      const os = orderItems[0];
      os.isCheck = true;

      const { data } = await axios.post(`/api/orders/pay/${orderId}`);
      console.log(data);
      setLoading(false);
      toast.success('کمتر از یک روز پرداخت شما بررسی خواهد شد');
      router.push('/');
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout>
      <div className="bg-gray-100  min-h-screen flex-col justify-start items-center">
        <h1 className="flex  justify-center pt-20 mb-5">
          اطلاعات خود را وارد کنید
        </h1>
        <div className="bg-gray-100 flex  justify-center">
          <div className="max-w-screen-sm bg-white p-5">
            <h2 className="text-gray-500">مبلغ قابل پرداخت</h2>
            <div className="p-5 bg-green-600 m-4 text-white text-ltr text-center text-lg">
              {enToper(orderItems[0].totalPrice)} ریال
            </div>
            <p>
              پس از پرداخت به کارت<b> 7811-5137-3377-6104 </b>به نام علی معینی
              جزنی شماره کارت خود را ثبت دکمه تایید را بزنید
            </p>
            <hr />
            <div>
              <div className="flex justify-center flex-row-reverse  gap-5 w-full  mt-3 ">
                <div>
                  <input
                    type=""
                    name=""
                    id="cardNumber1"
                    value={cardNumber1}
                    onChange={handleChange1}
                    maxLength={4}
                    className="max-w-[70px] bg-red-300 text-ltr text-center"
                  />
                </div>
                <div>
                  <input
                    type=""
                    name=""
                    id="cardNumber2"
                    value={cardNumber2}
                    onChange={handleChange2}
                    maxLength={4}
                    className="max-w-[70px] bg-red-300 text-ltr text-center"
                  />
                </div>{' '}
                <div>
                  <input
                    type=""
                    name=""
                    id="cardNumber3"
                    value={cardNumber3}
                    onChange={handleChange3}
                    maxLength={4}
                    className="max-w-[70px] bg-red-300 text-ltr text-center"
                  />
                </div>{' '}
                <div>
                  <input
                    type=""
                    name=""
                    id="cardNumber4"
                    value={cardNumber4}
                    onChange={handleChange4}
                    maxLength={4}
                    className="max-w-[70px] bg-red-300 text-ltr text-center active:shadow-xl"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="secondary-button"
                onClick={handlePay}
                disabled={
                  cardNumber1.length < 4 ||
                  cardNumber2.length < 4 ||
                  cardNumber3.length < 4 ||
                  cardNumber4.length < 4
                }
              >
                تایید شماره کارت{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
Cardpay.auth = true;
