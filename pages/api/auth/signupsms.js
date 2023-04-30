// import User from '@/models/User';
import user1 from '@/models/user1';
import db from '@/utils/db';
import bcryptjs from 'bcryptjs';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { mobile, password } = req.body;
  if (!mobile || !password || password.trim().length < 5) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  await db.connect();

  const existingUser = await user1.findOne({ mobile: mobile });
  if (existingUser && existingUser.mobile.includes('@')) {
    await db.disconnect();
    res.status(201).send({
      _id: existingUser._id,
      // name: existingUser.name,
      // email: existingUser.email,
      mobile: existingUser.mobile,
      isAdmin: existingUser.isAdmin,
    });
    return;
  }
  if (existingUser) {
    existingUser.password = bcryptjs.hashSync(password);
    existingUser.save();
    await db.disconnect();
    res.status(201).send({
      message: 'Created user!',
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      mobile: existingUser.mobile,
      isAdmin: existingUser.isAdmin,
    });
    return;
  }

  const newUser = new user1({
    mobile,

    password: bcryptjs.hashSync(password),
    isAdmin: false,
  });

  const user = await newUser.save();
  await db.disconnect();
  res.status(201).send({
    message: 'Created user!',
    _id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    isAdmin: user.isAdmin,
  });
}

export default handler;
