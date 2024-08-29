import prisma from "@/utils/prisma";

export const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      username: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
