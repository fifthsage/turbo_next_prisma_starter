/* eslint-disable turbo/no-undeclared-env-vars */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig, InvalidLoginError } from "./auth.config";
// import prisma from "@repo/database";

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email) {
          throw new InvalidLoginError("EMPTY_INPUT");
        }

        if (!password) {
          throw new InvalidLoginError("EMPTY_INPUT");
        }

        if (password !== process.env.PASSWORD) {
          throw new InvalidLoginError("INVALID_CREDENTIAL");
        }

        return {
          email: "fifthsage@gmail.com",
          name: "관리자",
        };
      },
    }),
  ],
});
