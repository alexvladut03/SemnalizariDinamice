"use server";
import prisma from "@/utils/prisma";
import { authActionClient } from "@/utils/safe-action";
import { ProductSchema } from "@/utils/zod";
import { revalidateTag } from "next/cache";

export const createProduct = authActionClient
  .use(async ({ next, ctx }) => {
    if (!ctx.userId) {
      throw new ActionError("Only admins can perform this action.");
    }
    return next();
  })
  .metadata({ actionName: "createProduct" })
  .schema(ProductSchema)
  .action(
    async ({
      parsedInput: {
        name,
        sku,
        price,
        stock,
        slug,
        mainImage,
        gallery,
        description,
        categoryId,
        subcategoryId,
        attributes,
      },
      ctx: { userId },
    }) => {
      const formatedSlug = slug
        ? slug.toLowerCase().replace(/ /g, "-")
        : name.toLowerCase().replace(/ /g, "-");

      // Check for existing product by name
      const existingProductByName = await prisma.product.findFirst({
        where: { name },
      });

      if (existingProductByName) {
        throw new Error("Un produs cu acest nume exista deja");
      }

      // Check for existing product by slug
      const existingProductBySlug = await prisma.product.findFirst({
        where: { slug: formatedSlug },
      });

      if (existingProductBySlug) {
        throw new Error("Un produs cu acest slug exista deja");
      }

      // Check for existing product by SKU
      const existingProductBySKU = await prisma.product.findUnique({
        where: { sku },
      });

      if (existingProductBySKU) {
        throw new Error("Un produs cu acest SKU exista deja");
      }

      // Check for duplicate attributes
      const duplicateAttributes = attributes.filter(
        (attribute, index) => attributes.indexOf(attribute) !== index
      );

      if (duplicateAttributes.length) {
        throw new Error(`Atribut duplicat : ${duplicateAttributes.join(", ")}`);
      }

      // Create the new product
      const newProduct = await prisma.product.create({
        data: {
          name,
          sku,
          price,
          stock,
          slug: formatedSlug,
          mainImage,
          gallery,
          description,
          categoryId,
          subcategoryId: subcategoryId || null,
          attributes: {
            create: attributes.map((attr) => ({
              attributeId: attr.attributeId,
              values: {
                set: attr.values,
              },
            })),
          },
        },
      });

      // Refresh the path or page
      revalidateTag("products");
      return { success: true, product: newProduct.name };
    }
  );
