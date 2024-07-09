"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "../auth";

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
