import prisma from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const preload = (id) => {
  void getUser(id);
};

export const getUser = unstable_cache(
  async (id) => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
      },
    });

    if (!user) {
      throw new Error("Utilizatorul nu a fost gasit.");
    }
    return user;
  },
  ["user"],
  { tags: ["user"] }
);
