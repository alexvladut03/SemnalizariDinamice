"use server";
import prisma from "@/utils/prisma";
import { authActionClient } from "@/utils/safe-action";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
});

export const deleteProduct = authActionClient
  .use(async ({ next, ctx }) => {
    // `userId` comes from the context set in the previous middleware function.
    if (!ctx.userId) {
      throw new ActionError("Only admins can do this action.");
    }
    // Here we pass the same untouched context (`userId`) to the next function, since we don't need
    // to add data to the context here.
    return next();
  })
  .metadata({ actionName: "deleteProduct" })
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new Error("Produsul nu a fost gasit");
    }

    await prisma.product.delete({
      where: { id },
    });

    revalidateTag("products");
    return { success: true, product: product.name };
  });
