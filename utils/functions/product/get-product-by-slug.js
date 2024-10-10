import prisma from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const preload = () => {
  void getProductBySlug();
};

export const getProductBySlug = unstable_cache(
  ({ slug }) => {
    const product = prisma.product.findFirst({
      where: {
        slug,
      },
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

    if (!product) {
      throw new Error("Produsul nu a fost gasit");
    }

    return product;
  },
  ["products"],
  { tags: ["products"] }
);
