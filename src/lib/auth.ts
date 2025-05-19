import type { Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { JWT } from 'next-auth/jwt';
import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

// Extend the built-in session and user types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      username?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      permission?: number;
    };
  }
  interface User {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    username?: string | null;
    name?: string | null;
    email?: string | null;
    permission?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    username?: string | null;
    email?: string | null;
    name?: string | null;
    permission?: number;
  }
}

type NextAuthOptions = {
  providers: unknown[];
  session: {
    strategy: 'jwt';
    maxAge: number;
  };
  jwt: {
    maxAge: number;
  };
  pages: {
    signIn: string;
    error: string;
  };
  callbacks: {
    jwt: (params: { token: JWT; user?: User }) => Promise<JWT>;
    session: (params: { session: Session; token: JWT }) => Promise<Session>;
  };
  debug?: boolean;
  secret?: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });
        
        if (!user) return null;
        
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isPasswordValid) return null;
        
        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          permission: user.permission,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Using a literal value instead of a string variable
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? null;
        token.name = user.name ?? null;
        token.firstName = user.firstName ?? null;
        token.lastName = user.lastName ?? null;
        token.username = user.username ?? null;
        token.permission = user.permission;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.email = token.email ?? null;
        session.user.name = token.name ?? null;
        session.user.firstName = token.firstName ?? null;
        session.user.lastName = token.lastName ?? null;
        session.user.username = token.username ?? null;
        session.user.permission = token.permission;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
};