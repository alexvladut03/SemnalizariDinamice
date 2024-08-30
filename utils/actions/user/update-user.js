"use server";

import { redirect } from "next/navigation";

import { hash } from "bcryptjs";
import { userSchema } from "@/utils/zod";
import prisma from "@/utils/prisma";
import { authActionClient } from "@/utils/safe-action";
import { revalidatePath } from "next/cache";

export const updateUser = authActionClient
  .use(async ({ next, ctx }) => {
    // `userId` comes from the context set in the previous middleware function.

    if (!ctx.userId) {
      throw new ActionError("Only admins can do this action.");
    }

    // Here we pass the same untouched context (`userId`) to the next function, since we don't need
    // to add data to the context here.
    return next();
  })
  .metadata({ actionName: "updateUser" })
  .schema(userSchema)
  .action(
    async ({
      parsedInput: { name, username, password, id },
      ctx: { userId },
    }) => {
      console.log("Updating user", id, name, username, password);

      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Hash password
      const hashedPassword = await hash(password, 12);

      const updatedUser = {
        name,
        username,
        password: hashedPassword,
      };

      await prisma.user.update({
        where: { id },
        data: updatedUser,
      });

      revalidatePath("/admin/utilizatori");
      return { success: true, name: name };
    }
  );
