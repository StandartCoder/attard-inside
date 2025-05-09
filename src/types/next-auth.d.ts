import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Extending the built-in User type with custom fields
   */
  interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    image?: string;
    permission?: number;
  }

  interface Session {
    user: {
      id: string;
      firstName?: string;
      lastName?: string;
      username?: string;
      name?: string;
      email?: string;
      image?: string;
      permission?: number;
    };
  }
} 