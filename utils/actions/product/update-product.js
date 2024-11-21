"use server";
import prisma from "@/utils/prisma";
import { authActionClient } from "@/utils/safe-action";
import { ProductSchema } from "@/utils/zod";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateProduct = authActionClient
  .use(async ({ next, ctx }) => {
    if (!ctx.userId) {
      throw new ActionError("Only admins can perform this action.");
    }
    return next();
  })
  .metadata({ actionName: "updateProduct" })
  .schema(ProductSchema)
  .action(
    async ({
      parsedInput: {
        name,
        sku,
        price,
        stock,
        slug,
        length,
        width,
        height,
        weight,
        mainImage,
        gallery,
        description,
        categoryId,
        subcategoryId,
        attributes,
        id,
      },
      ctx: { userId },
    }) => {
      const formatedSlug = slug
        ? slug.toLowerCase().replace(/ /g, "-")
        : name.toLowerCase().replace(/ /g, "-");

      console.log(id);

      // Check for existing product by name
      const existingProductByName = await prisma.product.findFirst({
        where: { name, NOT: { id } },
      });

      console.log("subcategoria este", existingProductByName);

      if (existingProductByName) {
        throw new Error("Un produs cu acest nume exista deja");
      }

      // Check for existing product by slug
      const existingProductBySlug = await prisma.product.findFirst({
        where: { slug: formatedSlug, NOT: { id } },
      });

      if (existingProductBySlug) {
        throw new Error("Un produs cu acest slug exista deja");
      }

      // Check for existing product by SKU
      const existingProductBySKU = await prisma.product.findUnique({
        where: { sku, NOT: { id } },
      });

      if (existingProductBySKU) {
        throw new Error("Un produs cu acest SKU exista deja");
      }

      // Check for duplicate attributes
      const duplicateAttributes = attributes.filter(
        (v, i, a) => a.findIndex((t) => t.attributeId === v.attributeId) !== i
      );

      if (duplicateAttributes.length) {
        throw new Error(`Atribut duplicat : ${duplicateAttributes.join(", ")}`);
      }

      // Check for existing product
      const product = await prisma.product.findUnique({
        where: { id: id },
      });

      if (!product) {
        throw new Error("Produsul nu exista");
      }

      // Check if the mainImage is in the gallery
      if (gallery.find((image) => image.id === mainImage.id)) {
        throw new Error("Imaginea principala este deja in galerie");
      }

      // Update the product
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: {
          name,
          sku,
          price,
          stock,
          slug: formatedSlug,
          length,
          width,
          height,
          weight,
          description,
          categoryId,
          subcategoryId: subcategoryId || null,
          attributes: {
            deleteMany: {}, // Remove all existing attributes
            create: attributes.map((attr) => ({
              attributeId: attr.attributeId,
              values: {
                set: attr.values,
              },
            })),
          },
          images: {
            deleteMany: {}, // Remove existing images if necessary
            create: [
              {
                image: {
                  connect: { id: mainImage.id }, // Connect the main image
                },
                isMain: true, // Set isMain to true for the main image
                order: 0, // Optionally set the order for the main image
              },
              ...gallery.map((image, index) => ({
                image: {
                  connect: { id: image.id }, // Connect each gallery image
                },
                isMain: false, // Set isMain to false for gallery images
                order: index + 1, // Set order for gallery images
              })),
            ],
          },
        },
      });

      // Refresh the path or page
      revalidateTag("products");
      return { success: true, product: updatedProduct.name };
    }
  );
