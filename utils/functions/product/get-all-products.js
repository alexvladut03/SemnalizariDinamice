import prisma from "@/utils/prisma";

export const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      subcategory: true,
      attributes: true,
    },
  });
  return products;
};
