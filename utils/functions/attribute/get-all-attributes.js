import prisma from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const preload = () => {
  void getAllAttributes();
};

export const getAllAttributes = unstable_cache(
  async () => {
    const attributes = await prisma.attribute.findMany();
    return attributes;
  },
  ["attributes"],
  { tags: ["attributes"] }
);
