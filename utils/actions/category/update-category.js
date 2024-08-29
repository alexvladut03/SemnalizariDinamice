"use server";
import { redirect } from "next/navigation";
import { connectDB } from "../../mongoose";
import { Category } from "../../models/category";

export const updateCategory = async (id, formData) => {
  const newCategoryId =
    formData.get("id") || formData.get("name").toLowerCase().replace(/ /g, "-");
  const newCategoryName = formData.get("name");
  const newCategoryDescription = formData.get("description");

  if (!newCategoryId || !newCategoryName) {
    throw new Error("Name and Id fields are required");
  }

  await connectDB();

  const category = await Category.findOne(id);

  if (!category) {
    throw new Error("Category not found");
  }

  const newCategory = {
    id: newCategoryId,
    name: newCategoryName,
    description: newCategoryDescription,
  };

  await Category.findOneAndUpdate(id, newCategory);
  console.log("Category updated", newCategory);
  redirect("/admin/categorii");
};
