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
      },
    });
    return products;
  },
  ["products"],
  { tags: ["products"] }
);
