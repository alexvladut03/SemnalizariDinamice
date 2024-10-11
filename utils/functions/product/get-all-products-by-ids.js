"use server";
import prisma from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const preload = () => {
  void getAllProductsByIds();
};

export const getAllProductsByIds = unstable_cache(
  async ({ ids }) => {
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
      },
    });

    products.map((product) => {
      product.mainImage = product.images.find((img) => img.isMain)?.image;
    });

    const filteredProducts = products.map((product) => {
      const { id, name, price, mainImage } = product;
      return { id, name, price, mainImage };
    });

    return filteredProducts;
  },
  ["products"],
  { tags: ["products"] }
);
