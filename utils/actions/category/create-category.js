"use server";

import { categorySchema } from "@/utils/zod";
import prisma from "@/utils/prisma";
import { authActionClient } from "@/utils/safe-action";
import { revalidateTag } from "next/cache";

export const createCategory = authActionClient
  .use(async ({ next, ctx }) => {
    if (!ctx.userId) {
      throw new ActionError("Only admins can perform this action.");
    }
    return next();
  })
  .metadata({ actionName: "createCategory" })
  .schema(categorySchema)
  .action(
    async ({
      parsedInput: { name, description, slug, parentId },
      ctx: { userId },
    }) => {
      const formatedSlug = slug
        ? slug.toLowerCase().replace(/ /g, "-")
        : name.toLowerCase().replace(/ /g, "-");

      // Check for existing category by name
      const existingCategoryByName = await prisma.category.findUnique({
        where: { name },
      });

      if (existingCategoryByName) {
        throw new Error("A category with this name already exists");
      }

      // Check for existing category by slug
      const existingCategoryBySlug = await prisma.category.findUnique({
        where: { slug: formatedSlug },
      });

      if (existingCategoryBySlug) {
        throw new Error("A category with this slug already exists");
      }

      // Create the new category
      const newCategory = await prisma.category.create({
        data: {
          name,
          description,
          slug: formatedSlug,
          parent: parentId ? { connect: { id: parentId } } : undefined, // Connect only if there's a parent
        },
      });

      // Refresh the path or page
      revalidateTag("categories");
      return { success: true, category: newCategory };
    }
  );
