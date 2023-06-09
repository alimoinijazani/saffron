import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
// import User from './../../../models/User';
import db from '@/utils/db';
import user1 from '@/models/user1';
export default NextAuth({
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;

      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();
        const user =
          // credentials.email
          //   ? await user1.findOne({
          //       email: credentials.email,
          //     })
          //   :
          await user1.findOne({
            mobile: credentials.mobile,
          });

        await db.disconnect();
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          console.log(user);
          return {
            mobile: user.mobile,
            _id: user._id,
            image: user.mobile,
            isAdmin: user.isAdmin,
          };
        }
        throw new Error('invalid email or password');
      },
    }),
  ],
  // secret: process.env.JWT_SECRET,
});
