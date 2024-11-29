"use server";

import { utapi } from "@/app/server/uploadthing";
import prisma from "@/utils/prisma";

import { authActionClient } from "@/utils/safe-action";
import { imageSchema } from "@/utils/zod";
import { revalidateTag } from "next/cache";

const deleteImage = authActionClient
  .use(async ({ next, ctx }) => {
    if (!ctx.userId) {
      throw new ActionError("Only admins can perform this action.");
    }
    return next();
  })
  .schema(imageSchema)
  .metadata({ actionName: "deleteImage" })
  .action(async ({ parsedInput: { image }, ctx: { userId } }) => {
    // Check if the image exists
    const imageExists = await prisma.image.findUnique({
      where: {
        id: image.id,
      },
    });

    if (!imageExists) {
      throw new Error("Imaginea nu exista.");
    }

    if (imageExists.uploadthingKey === null) {
      throw new Error("Imaginea nu are un uploadthingKey.");
    }

    if (imageExists.uploadthingKey !== image.uploadthingKey) {
      throw new Error("Cheia de upload nu corespunde cu imaginea.");
    }

    // Delete the image from the server
    const deleteResponse = await utapi.deleteFiles(image.uploadthingKey);

    console.log(deleteResponse);

    if (deleteResponse.error) {
      throw new Error(deleteResponse.error);
    }

    // Step 1: Delete the ProductImage records
    const productImages = await prisma.productImage.findMany({
      where: {
        imageId: image.id,
      },
    });

    const productIds = productImages.map((pi) => pi.productId);

    // Step 2: Delete ProductImage records associated with the image
    await prisma.productImage.deleteMany({
      where: {
        imageId: image.id,
      },
    });

    // Step 3: Delete the image from the database
    await prisma.image.delete({
      where: {
        id: image.id,
      },
    });

    // Refresh the path or page
    revalidateTag("images");
    revalidateTag("products");
    return { success: true };
  });

export default deleteImage;
