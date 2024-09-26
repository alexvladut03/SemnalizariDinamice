import prisma from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const preload = () => {
  void getAllCategories();
};

export const getAllCategories = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany({
      include: {
        children: {
          include: {
            children: {
              include: {
                children: true, // You can keep going deeper if needed
              },
            },
          },
        },
      },
    });
    return categories;
  },
  ["categories"],
  { tags: ["categories"] }
);
