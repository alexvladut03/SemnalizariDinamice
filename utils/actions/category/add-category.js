"use server";
import { redirect } from "next/navigation";
import { connectDB } from "../../mongoose";
import { Category } from "../../models/category";

export const addCategory = async (formData) => {
  const id =
    formData.id || formData.get("name").toLowerCase().replace(/ /g, "-");
  const name = formData.get("name");
  const description = formData.get("description");

  if (!id || !name) {
    throw new Error("Name and ID fields are required");
  }

  await connectDB();

  const existingCategory = await Category.findOne({ id });

  if (existingCategory) {
    throw new Error("Category with this ID already exists");
  }

  const category = {
    id,
    name,
    description,
  };

  await Category.create(category);
  console.log("Category created", category);
  redirect("/admin/categorii");
};
