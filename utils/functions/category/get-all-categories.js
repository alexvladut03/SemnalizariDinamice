import prisma from "@/utils/prisma";

export const getAllCategories = async () => {
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
};
