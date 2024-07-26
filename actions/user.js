"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "../auth";

import { hash } from "bcryptjs";
import { userSchema } from "@/lib/zod";
import { connectDB } from "@/lib/mongodb";
import prisma from "@/lib/prisma";

export const login = async (formData) => {
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    await signIn("credentials", {
      redirectTo: "/admin",
      redirect: false,
      username,
      password,
    });
  } catch (error) {
    return error.message;
  }

  redirect("/admin");
};

export const logout = async () => {
  await signOut({ calbackUrl: "/", redirect: true });
};

export const register = async (formData) => {
  const name = formData.get("name");
  const username = formData.get("username");
  const password = formData.get("password");

  const result = userSchema.safeParse({ username, password });

  if (!result.success) {
    return result.error.errors[0].message;
  }

  await connectDB();

  // Check if username exists
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await hash(password, 12);

  // Create user
  await prisma.user.create({
    data: {
      name,
      username,
      password: hashedPassword,
    },
  });

  console.log("User created");
  redirect("/admin/utilizatori");
};

export const getUsers = async () => {
  const users = prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
    },
  });

  return users;
};

export const deleteUser = async (id) => {
  await prisma.user.delete({
    where: { id },
  });

  redirect("/admin/utilizatori");
};

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

export const updateUser = async (id, formData) => {
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
};
