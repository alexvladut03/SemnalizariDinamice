"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "../auth";

import { User } from "@/lib/models/User";
import { hash } from "bcryptjs";
import { userSchema } from "@/lib/zod";
import { connectDB } from "@/lib/mongodb";

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
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await hash(password, 12);

  // Create user
  await User.create({
    name,
    username,
    password: hashedPassword,
  });
  console.log("User created");
  redirect("/admin/utilizatori");
};

export const getUsers = async () => {
  await connectDB();
  const users = await User.find();
  return users;
};

export const deleteUser = async (id) => {
  await connectDB();
  await User.findByIdAndDelete(id);

  redirect("/admin/utilizatori");
};

export const getUser = async (id) => {
  await connectDB();
  const user = await User.findById(id);
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

  await connectDB();

  const user = await User.findById(id);

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

  await User.findByIdAndUpdate(id, updatedUser);
  console.log("User updated");
  redirect("/admin/utilizatori");
};
