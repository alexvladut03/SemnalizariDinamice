"use server";

import { utapi } from "@/app/server/uploadthing";
import { authActionClient } from "@/utils/safe-action";
import { imagesSchema } from "@/utils/zod";
import { revalidateTag } from "next/cache";

const addImage = authActionClient
  .use(async ({ next, ctx }) => {
    if (!ctx.userId) {
      throw new ActionError("Only admins can perform this action.");
    }
    return next();
  })
  .schema(imagesSchema)
  .metadata({ actionName: "addImage" })
  .action(async ({ parsedInput, ctx: { userId } }) => {
    // Extract files from FormData
    const files = parsedInput.getAll("files");

    // Test if there are files
    if (!files.length) {
      throw new Error("Nu s-au gasit fisiere.");
    }

    // Upload the files to the server
    const uploadResponse = await utapi.uploadFiles(files);

    uploadResponse.forEach((response) => {
      if (response.error) {
        throw new Error(response.error);
      }
    });

    // Save the images to the database
    const uploadedImages = await prisma.image.createMany({
      data: uploadResponse.map((response) => ({
        url: response.data.url,
        name: response.data.name,
        uploadthingKey: response.data.key,
      })),
    });

    // Refresh the path or page
    revalidateTag("images");
    return { success: true };
  });

export default addImage;
