/* eslint-disable turbo/no-undeclared-env-vars */
import prisma from "@repo/database";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import { authConfig, InvalidLoginError } from "./auth.config";

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

        if (!email || !password) {
          throw new InvalidLoginError("EMPTY_INPUT");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new InvalidLoginError("NOT_EXISTS");
        }

        if (
          !!process.env.ADMIN_PASSWORD &&
          password !== process.env.ADMIN_PASSWORD
        ) {
          throw new InvalidLoginError("INVALID_CREDENTIAL");
        }

        console.log("User authenticated:", user.email);

        return {
          id: user.id,
          name: user.name || "알 수 없음",
          email: user.email || "알 수 없음",
        };
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
  ],
});
