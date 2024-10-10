import prisma from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const preload = () => {
  void getAllImages();
};

export const getAllImages = unstable_cache(
  async () => {
    const images = await prisma.image.findMany();
    return images;
  },
  ["images"],
  { tags: ["images"] }
);
