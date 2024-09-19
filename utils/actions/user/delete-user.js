"use server";

import prisma from "@/utils/prisma";
import { authActionClient } from "@/utils/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
});

export const deleteUser = authActionClient
  .use(async ({ next, ctx }) => {
    // `userId` comes from the context set in the previous middleware function.
    if (!ctx.userId) {
      throw new ActionError("Only admins can do this action.");
    }
    // Here we pass the same untouched context (`userId`) to the next function, since we don't need
    // to add data to the context here.
    return next();
  })
  .metadata({ actionName: "deleteUser" })
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/admin/utilizatori");

    return { success: true, username: user.name };
  });
