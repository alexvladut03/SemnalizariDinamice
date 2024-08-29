"use server";

import { redirect } from "next/navigation";

import { hash } from "bcryptjs";
import { userSchema } from "@/utils/zod";
import prisma from "@/utils/prisma";

export const updateUser = async (id, formData) => {
  /*
  const name = formData.get("name");
  const username = formData.get("username");
  const password = formData.get("password");

  const result = userSchema.safeParse({ username, password });

  if (!result.success) {
    return result.error.errors[0].message;
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Hash password
  const hashedPassword = await hash(password, 12);

  const updatedUser = {
    name,
    username,
    password: hashedPassword,
  };

  await prisma.user.update({
    where: { id },
    data: updatedUser,
  });
  console.log("User updated");
  redirect("/admin/utilizatori");
  */
};
