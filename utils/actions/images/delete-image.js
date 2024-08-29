"use server";
import { utapi } from "@/app/server/uploadthing";

export const deleteImage = async (imageKey) => {
  try {
    await utapi.deleteFiles(imageKey);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
