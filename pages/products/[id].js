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
  const router = useRouter();
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    product: {},
    error: '',
  });

  const [isFeatured, setIsFeatured] = useState(product.isFeatured || false);
  const [name, setName] = useState(product.name || '');
  const [slug, setSlug] = useState(product.slug || '');
  const [category, setCategory] = useState(product.category || '');
  const [price, setPrice] = useState(product.price || '');
  const [description, setDescription] = useState(product.description || '');
  const [image, setImage] = useState(product.image || '');
  const [countInStock, setCountInStock] = useState(product.countInStock || '');

  const [imageSrc, setImageSrc] = useState(product.image || '');

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
    const setData = () => {};
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
      router.push('/products');
      toast.success('product updated');
    } catch (err) {
      console.log(err);
    }
  };
  // function handleOnChange(changeEvent) {
  //   const reader = new FileReader();

  //   reader.onload = function(onLoadEvent) {
  //     setImageSrc(onLoadEvent.target.result);
  //     setUploadData(undefined);
  //   }

  //   reader.readAsDataURL(changeEvent.target.files[0]);
  // }
  async function uploadFileHandler(e) {
    e.preventDefault();

    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);

    bodyFormData.append('upload_preset', 'my-uploads');
    try {
      const data = await fetch(
        `https://api.cloudinary.com/v1_1/duro2a1d2/image/upload`,
        {
          method: 'POST',
          body: bodyFormData,
        }
      ).then((r) => r.json());
      setImage(data.secure_url);
      setImageSrc(data.secure_url);

      toast.success('image upload');
    } catch (err) {
      toast.error(err);
    }
  }
  console.log(imageSrc);
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
              className="w-full"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="category">گروه</label>
            <input
              type="text"
              className="w-full"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></input>
          </div>
          <div className="mb-4 ">
            <label htmlFor="image">تصویر</label>
            <div className="flex">
              <input
                type="text"
                className="w-full "
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                disabled
              ></input>{' '}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="price">قیمت</label>
            <input
              type="number"
              className="w-full"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>

          <div className="mb-4">
            <label htmlFor="countInStock">موجودی</label>
            <input
              type="text"
              className="w-full"
              id="countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="price">توضیحات</label>
            <input
              type="text"
              className="w-full"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>

          <div className="mb-4 text-center">
            <div className="flex justify-between w-full">
              <label htmlFor="profile-picture">انتخاب عکس</label>
              <input
                type="file"
                accept="image/*"
                onChange={uploadFileHandler}
              />{' '}
              <Image
                src={imageSrc ? imageSrc : image}
                alt="My Image"
                width={50}
                height={50}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <div className="my-4 flex ">
              <label htmlFor=" isFeatured">نمایش در ویترین</label>
              <input
                type="checkbox"
                className="w-full"
                id="isFeatured"
                checked={isFeatured}
                onChange={() => setIsFeatured(!isFeatured)}
              ></input>
            </div>
            <button type="submit" className="primary-button mt-4">
              تایید
            </button>
          </div>
        </form>
      )}
    </Layout>
  );
}
ProductEdit.auth = true;
