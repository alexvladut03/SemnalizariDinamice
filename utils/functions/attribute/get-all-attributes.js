import prisma from "@/utils/prisma";

export const getAllAttributes = async () => {
  const attributes = await prisma.attribute.findMany();
  return attributes;
};
