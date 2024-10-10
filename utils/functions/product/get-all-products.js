import prisma from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const preload = () => {
  void getAllProducts();
};

export const getAllProducts = unstable_cache(
  async () => {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        subcategory: true,
        attributes: true,
        images: {
          include: {
            image: true, // Include the Image model to get the URL
          },
        },
      },
    });
    return products;
  },
  ["products"],
  { tags: ["products"] }
);
