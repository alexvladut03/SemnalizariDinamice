"use server";

import prisma from "@/utils/prisma";
import { authActionClient } from "@/utils/safe-action";
import { attributeSchema } from "@/utils/zod";
import { revalidateTag } from "next/cache";

export const updateAttribute = authActionClient
  .use(async ({ next, ctx }) => {
    if (!ctx.userId) {
      throw new ActionError("Only admins can perform this action.");
    }
    return next();
  })
  .metadata({ actionName: "updateAttribute" })
  .schema(attributeSchema)
  .action(
    async ({ parsedInput: { name, slug, values, id }, ctx: { userId } }) => {
      const formatedSlug = slug
        ? slug.toLowerCase().replace(/ /g, "-")
        : name.toLowerCase().replace(/ /g, "-");

      // Check for existing attribute by name
      const existingAttributeByName = await prisma.attribute.findFirst({
        where: { name, NOT: { id } },
      });

      if (existingAttributeByName) {
        throw new Error("An attribute with this name already exists");
      }

      // Check for existing attribute by slug
      const existingAttributeBySlug = await prisma.attribute.findFirst({
        where: { slug: formatedSlug, NOT: { id } },
      });

      if (existingAttributeBySlug) {
        throw new Error("An attribute with this slug already exists");
      }

      // Check for duplicate values
      const duplicateValues = values.filter(
        (value, index) => values.indexOf(value) !== index
      );

      if (duplicateValues.length) {
        throw new Error(`Valoare duplicata : ${duplicateValues.join(", ")}`);
      }

      // Update the attribute
      const updatedAttribute = await prisma.attribute.update({
        where: { id },
        data: {
          name,
          slug: formatedSlug,
          values: {
            set: values,
          },
        },
      });

      // Refresh the path or page
      revalidateTag("attributes");
      return { success: true, attribute: updatedAttribute };
    }
  );
