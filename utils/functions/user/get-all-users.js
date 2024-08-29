import prisma from "@/utils/prisma";

export const getAllUsers = async () => {
  const users = prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
    },
  });

  return users;
};
