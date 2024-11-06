import prisma from "@/utils/prisma";

export const getProductBySlug = async (slug) => {
  const product = await prisma.product.findFirst({
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
};
