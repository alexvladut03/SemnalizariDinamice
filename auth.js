import { User } from "@/lib/models/User";
import { connectDB } from "@/lib/mongodb";
import { userSchema } from "@/lib/zod";
import { compare } from "bcryptjs";
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

        await connectDB();

        const user = await User.findOne({ username }).select("+password +name");

        if (!user) throw new Error("Invalid credentials");

        if (!user.password) throw new Error("Invalid credentials");

        const isValid = await compare(password, user.password);

        if (!isValid) throw new Error("Wrong password");

        const userData = {
          username: user.username,
          name: user.name,
          id: user._id,
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
