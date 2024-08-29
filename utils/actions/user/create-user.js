"use server";

import { redirect } from "next/navigation";

import { hash } from "bcryptjs";

import { userSchema } from "@/utils/zod";
import { connectDB } from "@/utils/mongoose";
import prisma from "@/utils/prisma";
import { authActionClient } from "@/utils/safe-action";

export const createUser = authActionClient
  .use(async ({ next, ctx }) => {
    // `userId` comes from the context set in the previous middleware function.

    if (!ctx.userId) {
      throw new ActionError("Only admins can do this action.");
    }

    // Here we pass the same untouched context (`userId`) to the next function, since we don't need
    // to add data to the context here.
    return next();
  })
  .metadata({ actionName: "createUser" })
  .schema(userSchema)
  .action(
    async ({ parsedInput: { name, username, password }, ctx: { userId } }) => {
      await connectDB();

      // Check if username exists
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser) {
        return {
          success: false,
          error: "Deja exista un utilizator cu acest username",
        };
      }

      // Hash password
      const hashedPassword = await hash(password, 12);

      // Create user
      await prisma.user.create({
        data: {
          name,
          username,
          password: hashedPassword,
        },
      });

      console.log("User created");
      redirect("/admin/utilizatori");
    }
  );
