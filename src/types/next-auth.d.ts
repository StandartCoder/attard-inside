// types/next-auth.d.ts
declare module "next-auth" {
  interface User {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    username?: string | null;
    email?: string | null;
    image?: string | null;
    permission?: number;
  }

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

  interface NextAuthConfig {}
}