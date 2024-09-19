"use server";
import prisma from "@/utils/prisma";
import { authActionClient } from "@/utils/safe-action";
import { attributeSchema } from "@/utils/zod";
import { revalidatePath } from "next/cache";

export const createAttribute = authActionClient
  .use(async ({ next, ctx }) => {
    if (!ctx.userId) {
      throw new ActionError("Only admins can perform this action.");
    }
    return next();
  })
  .metadata({ actionName: "createAttribute" })
  .schema(attributeSchema)
  .action(async ({ parsedInput: { name, slug, values }, ctx: { userId } }) => {
    const formatedSlug = slug
      ? slug.toLowerCase().replace(/ /g, "-")
      : name.toLowerCase().replace(/ /g, "-");

    // Check for existing attribute by name
    const existingAttributeByName = await prisma.attribute.findUnique({
      where: { name },
    });

    if (existingAttributeByName) {
      throw new Error("Un atribut cu acest nume exista deja");
    }

    // Check for existing attribute by slug
    const existingAttributeBySlug = await prisma.attribute.findUnique({
      where: { slug: formatedSlug },
    });

    if (existingAttributeBySlug) {
      throw new Error("Un atribut cu acest slug exista deja");
    }

    // Check for duplicate values
    const duplicateValues = values.filter(
      (value, index) => values.indexOf(value) !== index
    );

    if (duplicateValues.length) {
      throw new Error(`Valoare duplicata : ${duplicateValues.join(", ")}`);
    }

    // Create the new attribute
    const newAttribute = await prisma.attribute.create({
      data: {
        name,
        slug: formatedSlug,
        values,
      },
    });

    // Refresh the path or page
    revalidatePath("/admin/atribute");
    return { success: true, attribute: newAttribute };
  });
