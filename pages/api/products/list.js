import Product from '@/models/Product';

import db from '@/utils/db';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user) {
    return res.status(401).send({ message: 'signin required' });
  }

  await db.connect();
  const products = await Product.find();
  await db.disconnect();
  res.send(products);
};

export default handler;
