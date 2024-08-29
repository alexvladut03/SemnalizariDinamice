"use server";
import { redirect } from "next/navigation";
import { connectDB } from "../../mongoose";
import { Category } from "../../models/category";

export const deleteCategory = async (id) => {
  await connectDB();

  const category = await Category.findOne({ id });

  if (!category) {
    throw new Error("Category not found");
  }

  await Category.deleteOne({ id });
  console.log("Category deleted successfully");
  redirect("/admin/categorii");
};
