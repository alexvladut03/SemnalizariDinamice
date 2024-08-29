"use server";

import { utapi } from "@/app/server/uploadthing";

export const getImages = async () => {
  try {
    const uploads = await utapi.listFiles();
    return { success: true, uploads };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getImagesCustom = async () => {
  try {
    const uploads = (await utapi.listFiles()).files;
    return { success: true, uploads };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
