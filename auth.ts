

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { saltAndHashPassword } from "./utils/helper";
import bcrypt from "bcryptjs";
import { db } from "./db";

export const {
  handlers: { GET, POST }, signIn, signOut, auth, } =
  NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    debug: true,
    providers: [
      GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID!,
        clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      }),
      GitHubProvider({
        clientId: process.env.AUTH_GITHUB_ID!,
        clientSecret: process.env.AUTH_GITHUB_SECRET!,
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          if (!credentials || !credentials.email || !credentials.password) {
            return null;
          }
          const user = await db.user.findUnique({
            where: { email: credentials?.email as string },
          });
          if (user) {
            
            return { ...user, id: user.id };
          }
          return null;
        },
      }),
    ],
    
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = user?.id || token.sub || ""; 
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  }

})

