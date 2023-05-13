import Product from '@/models/Product';
import db from '@/utils/db';

const handler = async (req, res) => {
  const {
    name,
    slug,
    category,
    price,
    description,
    isFeatured,
    image,
    countInStock,
  } = req.body;
  if (req.method === 'PUT') {
    await db.connect();
    const product = await Product.findById(req.query.id);
    (product.name = name),
      (product.slug = slug),
      (product.category = category),
      (product.price = price),
      (product.description = description),
      (product.isFeatured = isFeatured || false),
      (product.image = image),
      (product.countInStock = countInStock),
      await product.save();
    await db.disconnect();
    res.send({ message: 'product edited' });
  }
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
};
export default handler;
