"use server";

import prisma from "@/utils/prisma";
import { authActionClient } from "@/utils/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
});

export const deleteCategory = authActionClient
  .use(async ({ next, ctx }) => {
    // `userId` comes from the context set in the previous middleware function.
    if (!ctx.userId) {
      throw new ActionError("Only admins can do this action.");
    }
    // Here we pass the same untouched context (`userId`) to the next function, since we don't need
    // to add data to the context here.
    return next();
  })
  .metadata({ actionName: "deleteCategory" })
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    // Use a transaction to ensure all operations succeed or fail together
    return await prisma.$transaction(async (tx) => {
      const category = await tx.category.findUnique({
        where: { id },
        include: { children: true },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      // If the category has children, update their parentId to null
      if (category.children.length > 0) {
        await tx.category.updateMany({
          where: { parentId: id },
          data: { parentId: null },
        });
      }

      // Now we can safely delete the category
      await tx.category.delete({
        where: { id },
      });

      revalidatePath("/admin/categorii");

      return { success: true, category: category.name };
    });
  });
