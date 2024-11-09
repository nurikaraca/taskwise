import NextAuth from "next-auth";

import google from 'next-auth/providers/google'
import GitHub from "next-auth/providers/github"

import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import { saltAndHashPassword } from "./utils/helper";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },signIn,signOut, auth, } =
   NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  debug: true,
  providers: [
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "youremail@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      //kesildi 
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const email = credentials.email as string;
        let user: any = await db.user.findUnique({
          where: {
            email,
          },
        });
      
        if (!user) {
          const hash = saltAndHashPassword(credentials.password);
          user = await db.user.create({
            data: {
              email,
              hashedPassword: hash,
            },
          });
        }
        return user;
      },
    }),
  ],


});

