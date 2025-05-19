// types/next-auth.d.ts
import 'next-auth';

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