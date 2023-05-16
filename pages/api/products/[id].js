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
  if (req.method === 'DELETE') {
    await db.connect();
    const product = await Product.findById(req.query.id);
    if (product) {
      await Product.deleteOne({ _id: req.query.id });
      res.send({ message: 'product delete from backend' });
    } else {
      res.status(404).send({ message: 'product already deleted' });
    }

    await db.disconnect();
  }
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
};
export default handler;
