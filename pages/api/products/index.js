import Product from '@/models/Product';
import db from '@/utils/db';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    await db.connect();
    const newProduct = new Product({
      name: 'Sample Name' + Date.now(),
      slug: 'sample-slug' + Date.now(),
      category: 'sample category',
      image: '/image/p1',
      price: 0,
      countInStock: 0,
      brand: 'sample brand',
      rating: 0,
      numReviews: 0,
      description: 'sample Description',
    });
    const product = await newProduct.save();

    await db.disconnect();
    res.send({ message: 'product Created', product });
  }
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
};
export default handler;
