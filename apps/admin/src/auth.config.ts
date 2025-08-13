import { CredentialsSignin, type NextAuthConfig } from "next-auth";

export class InvalidLoginError extends CredentialsSignin {
  code = "unknown";
  constructor(message: string) {
    super(message);
    this.code = message;
  }
}

export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async authorized({ auth }) {
      return !!auth;
    },
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
} satisfies NextAuthConfig;
