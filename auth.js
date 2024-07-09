import { userSchema } from "@/lib/zod";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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

        const isValid = username === "admin" && password === "admin";

        if (!isValid) throw new Error("Wrong password or username");

        const userData = {
          id: 1,
          name: username,
        };

        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
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
});
