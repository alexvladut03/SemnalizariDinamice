import prisma from "@/utils/prisma";

export const getAllProductsByIds = async (ids) => {
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    select: {
      id: true,
      mainImage: true,
      name: true,
      price: true,
    },
  });
  return products;
};
