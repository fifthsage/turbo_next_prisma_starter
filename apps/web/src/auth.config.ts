import { escapePhoneNumber, SOCIAL_PROVIDER } from "@repo/common";
import prisma from "@repo/database";
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
    async signIn({ user: { id, email, name, image }, profile, account }) {
      try {
        switch (account?.provider) {
          case "credentials": {
            return true;
          }
          default: {
            if (!id || !email) {
              throw new InvalidLoginError("Missing id or email");
            }

            const userData = {
              name,
              profileImageUrl: image,
              contact: escapePhoneNumber(
                profile?.kakao_account.phone_number || "",
              ),
              // sex:
              //   profile?.kakao_account.gender === "male"
              //     ? Sex.MALE
              //     : Sex.FEMALE,
            };

            const user = await prisma.user.upsert({
              where: { email },
              create: {
                ...userData,
                email,
              },
              update: {
                ...userData,
                deletedAt: null,
              },
            });

            const socialAccountQuery = {
              socialType: SOCIAL_PROVIDER.KAKAO,
              socialId: id,
            };

            const socialUserAccount = await prisma.userSocialAccount.findFirst({
              where: socialAccountQuery,
            });

            if (!socialUserAccount) {
              await prisma.userSocialAccount.create({
                data: {
                  ...socialAccountQuery,
                  userId: user.id,
                },
              });
            }

            return true;
          }
        }
      } catch (error: unknown) {
        console.error("[next-auth] signIn", error);
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.id;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, user: token.user };
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
