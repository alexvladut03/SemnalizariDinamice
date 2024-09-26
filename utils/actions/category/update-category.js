"use server";

import { categorySchema } from "@/utils/zod";
import prisma from "@/utils/prisma";
import { authActionClient } from "@/utils/safe-action";
import { revalidateTag } from "next/cache";

export const updateCategory = authActionClient
  .use(async ({ next, ctx }) => {
    if (!ctx.userId) {
      throw new ActionError("Only admins can perform this action.");
    }
    return next();
  })
  .metadata({ actionName: "updateCategory" })
  .schema(categorySchema)
  .action(
    async ({
      parsedInput: { name, description, slug, parentId, id },
      ctx: { userId },
    }) => {
      const formatedSlug = slug
        ? slug.toLowerCase().replace(/ /g, "-")
        : name.toLowerCase().replace(/ /g, "-");

      // Check for existing category by name
      const existingCategoryByName = await prisma.category.findFirst({
        where: { name, NOT: { id } },
      });

      if (existingCategoryByName) {
        throw new Error("O categorie cu acest nume exista deja");
      }

      // Check for existing category by slug
      const existingCategoryBySlug = await prisma.category.findFirst({
        where: { slug: formatedSlug, NOT: { id } },
      });

      if (existingCategoryBySlug) {
        throw new Error("O categorie cu acest slug exista deja");
      }

      // Update the category
      const updatedCategory = await prisma.category.update({
        where: { id },
        data: {
          name,
          description,
          slug: formatedSlug,
          parent: parentId ? { connect: { id: parentId } } : undefined, // Connect only if there's a parent
        },
      });

      // Refresh the path or page
      revalidateTag("categories");
      return { success: true, category: updatedCategory };
    }
  );
