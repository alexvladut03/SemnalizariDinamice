import prisma from "@/utils/prisma";

export const getProductBySlug = ({ slug }) => {
  const product = prisma.product.findFirst({
    where: {
      slug,
    },
    include: {
      category: true,
      subcategory: true,
      attributes: true,
    },
  });

  if (!product) {
    throw new Error("ProdusuL nu a fost gasit");
  }

  return product;
};
