import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/db";
// import Google from "next-auth/providers/google";
// import Github from "next-auth/providers/github";
import { getUserById } from "./user";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

const config = {
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow )auth without email verification
      if (account?.provider !== "credentials") {
        return true;
      }
      const existingUser = await getUserById(user.id);

      // prevent signIn without email verification
      if (!existingUser?.emailVerified) {
        return false;
      }

      // Todo: add 2fa check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) {
          return false;
        }

        // delete two factor confirmation for next sign in
        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && token.role) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email  
        session.user.isOAuth = token.isOAuth as boolean
      }
      return session;
    },
    async jwt({ token }) {
      // console.log("I am beign called again")   
      if (!token.sub) {
        return token;
      }

      const existingUser: any = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth =  !!existingAccount; 
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);

// const config = {
//   providers: [Google, Github],
//   adapter: PrismaAdapter(prisma),
//   session: { strategy: "jwt" },
// } satisfies NextAuthConfig;

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth(config);
