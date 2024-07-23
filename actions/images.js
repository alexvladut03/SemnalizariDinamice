"use server";
import { utapi } from "@/app/server/uploadthing";

export const imageRemove = async (imageKey) => {
  try {
    await utapi.deleteFiles(imageKey);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUploads = async () => {
  try {
    const uploads = await utapi.listFiles();
    return { success: true, uploads };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
