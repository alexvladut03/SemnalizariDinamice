"use server";

import prisma from "@/utils/prisma";
import { authActionClient } from "@/utils/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
});

export const deleteAttribute = authActionClient
  .use(async ({ next, ctx }) => {
    // `userId` comes from the context set in the previous middleware function.
    if (!ctx.userId) {
      throw new ActionError("Only admins can do this action.");
    }
    // Here we pass the same untouched context (`userId`) to the next function, since we don't need
    // to add data to the context here.
    return next();
  })
  .metadata({ actionName: "deleteAttribute" })
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const attribute = await prisma.attribute.findUnique({ where: { id } });

    if (!attribute) {
      throw new Error("Atributul nu a fost gasit");
    }

    await prisma.attribute.delete({
      where: { id },
    });

    revalidatePath("/admin/attributes");

    return { success: true, attribute: attribute.name };
  });
