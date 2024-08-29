"use server";

import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";

export const deleteUser = async (id) => {
  await prisma.user.delete({
    where: { id },
  });

  redirect("/admin/utilizatori");
};
