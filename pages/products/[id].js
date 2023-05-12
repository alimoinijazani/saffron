import Layout from '@/components/Layout';
import { getError } from '@/utils/error';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer, useState } from 'react';
// import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Image from 'next/image';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductEdit() {
  const { query } = useRouter();
  const { id: productId } = query;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    product: {},
    error: '',
  });
  // const {
  //   handleSubmit,
  //   register,
  //   setValue,
  //   formState: { errors },
  // } = useForm();
  const [isFeatured, setIsFeatured] = useState(product.isFeatured || false);
  const [name, setName] = useState(product.name || '');
  const [slug, setSlug] = useState(product.slug || '');
  const [category, setCategory] = useState(product.category || '');
  const [price, setPrice] = useState(product.price || '');
  const [description, setDescription] = useState(product.description || '');
  const [image, setImage] = useState(product.image || '');
  const [countInStock, setCountInStock] = useState(product.countInStock || '');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        setSlug(data.slug || '');
        setName(data.name || '');
        setCategory(data.category || '');
        setPrice(data.price || 0);
        setDescription(data.description || '');
        setIsFeatured(data.isFeatured || '');
        setImage(data.image || '');
        setCountInStock(data.countInStock || '');
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (
      (!product._id && productId) ||
      (product._id && product._id !== productId)
    ) {
      fetchOrder();
    }
    const setData = () => {
      // setShow(product.isFeatured);
      // setValue('slug', slug || '');
      // setValue('name', name || '');
      // setValue('category', category || '');
      // setValue('price', price || '');
      // setValue('description', description || '');
      // setValue('isFeatured', product.isFeatured || '');
      // setValue('image', image || '');
      // setValue('countInStock', countInStock || '');
    };
    if (product) {
      setData();
    }
  }, [
    category,
    countInStock,
    description,
    image,
    name,
    price,
    product,
    productId,
    slug,
  ]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${product._id}`, {
        name,
        slug,
        category,
        price,
        description,
        isFeatured,
        image,
        countInStock,
      });
      toast.success('product updated');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <h1 className="mb-4 text-lg">{`محصول ${productId}`}</h1>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <form className="mx-auto max-w-screen-sm" onSubmit={submitHandler}>
          <h1 className="mb-4 text-xl"></h1>
          <div className="mb-4">
            <label htmlFor="name">نام محصول</label>
            <input
              type="text"
              className="w-full"
              id="name"
              autoFocus
              required
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              // {...register('name', {
              //   required: 'لطفا وارد کنید',
              // })}
            />
            {/* {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )} */}
          </div>

          <div className="mb-4">
            <label htmlFor="slug">نام منحصر</label>
            <input
              type="text"
              // {...register('slug', {
              //   required: 'لطفا ایمیل خود را وارد کنید',
              // })}
              className="w-full"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            ></input>
            {/* {errors.slug && (
              <div className="text-red-500">{errors.slug.message}</div>
            )} */}
          </div>
          <div className="mb-4">
            <label htmlFor="category">گروه</label>
            <input
              type="text"
              // {...register('category', {
              //   required: 'لطفا پسورد وارد کنید',
              //   minLength: {
              //     value: 6,
              //     message: 'password is more than 5 chars',
              //   },
              // })}
              className="w-full"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></input>
            {/* {errors.category && (
              <div className="text-red-500 ">{errors.category.message}</div>
            )} */}
          </div>
          <div className="mb-4 ">
            <label htmlFor="image">تصویر</label>
            <div className="flex">
              <input
                type="text"
                // {...register('image', {
                //   required: 'لطفا عکس وارد کنید',
                //   minLength: {
                //     value: 6,
                //     message: 'password is more than 5 chars',
                //   },
                // })}
                className="w-full "
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>{' '}
              <Image src={image} alt="My Image" width={30} height={30} />
            </div>
            {/* {errors.image && (
              <div className="text-red-500 ">{errors.image.message}</div>
            )} */}
          </div>
          <div className="mb-4">
            <label htmlFor="price">قیمت</label>
            <input
              type="number"
              // {...register('price', {
              //   required: 'لطفا مبلغ وارد کنید',
              // })}
              className="w-full"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
            {/* {errors.price && (
              <div className="text-red-500 ">{errors.price.message}</div>
            )} */}
          </div>

          <div className="mb-4">
            <label htmlFor="countInStock">موجودی</label>
            <input
              type="text"
              // {...register('countInStock', {
              //   required: 'لطفا مبلغ وارد کنید',
              // })}
              className="w-full"
              id="countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></input>
            {/* {errors.countInStock && (
              <div className="text-red-500 ">{errors.countInStock.message}</div>
            )} */}
          </div>
          <div className="mb-4">
            <label htmlFor="price">توضیحات</label>
            <input
              type="text"
              // {...register('description', {
              //   required: 'لطفا توضیحات وارد کنید',
              // })}
              className="w-full"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
            {/* {errors.description && (
              <div className="text-red-500 ">{errors.description.message}</div>
            )} */}
          </div>
          <div className="mb-4">
            <label htmlFor=" isFeatured">نمایش ویترین</label>
            <input
              type="checkbox"
              className="w-full"
              id="isFeatured"
              checked={isFeatured}
              onChange={() => setIsFeatured(!isFeatured)}
            ></input>
          </div>
          <div className="mb-4 text-center">
            <button type="submit" className="primary-button">
              تایید
            </button>
          </div>
        </form>
      )}
    </Layout>
  );
}
ProductEdit.auth = true;
