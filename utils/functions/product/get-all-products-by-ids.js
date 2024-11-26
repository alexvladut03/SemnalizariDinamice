"use server";
import prisma from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const getAllProductsByIds = unstable_cache(
  async (ids) => {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        images: {
          include: {
            image: true, // Include the Image model to get the URL
          },
        },
        category: true,
      },
    });

    return products;
  },
  ["products"],
  { tags: ["products"] }
);
