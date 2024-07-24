import { userSchema } from "@/lib/zod";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { username, password } = await userSchema.parse(credentials);

        if (!username || !password)
          throw new Error("Username and password are required");

        const user = await prisma.user.findUnique({
          where: { username },
          select: { id: true, username: true, name: true, password: true },
        });

        if (!user) throw new Error("Invalid credentials");

        const isValid = await compare(password, user.password);

        if (!isValid) throw new Error("Wrong password");

        const userData = {
          username: user.username,
          name: user.name,
          id: user.id,
        };

        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
});
