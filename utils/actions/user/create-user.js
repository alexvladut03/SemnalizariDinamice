"use server";

import { hash } from "bcryptjs";

import { registerSchema } from "@/utils/zod";

import prisma from "@/utils/prisma";
import { authActionClient } from "@/utils/safe-action";
import { revalidateTag } from "next/cache";

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
  .schema(registerSchema)
  .action(
    async ({ parsedInput: { name, username, password }, ctx: { userId } }) => {
      // Check if username exists
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser) {
        throw new Error("Acest username exista deja");
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

      revalidateTag("users");
      return { success: true, name: name };
    }
  );
