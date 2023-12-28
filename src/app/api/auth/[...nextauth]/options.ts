import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import { addUser } from '@/service/sanity/user';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token }) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          id: token.id as string,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async signIn({ user: { id, name, image, email } }) {
      if (!email) {
        return false;
      }

      addUser({
        id,
        name: name || '',
        image: image || '',
        email,
      });

      return true;
    },
  },
};

export default authOptions;
