"use server";
import { Category } from "@/lib/models/Category";
import { connectDB } from "@/lib/mongodb";
import { redirect } from "next/navigation";

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

export const getCategories = async () => {
  await connectDB();

  const categories = await Category.find({});
  return categories;
};

export const getCategory = async (id) => {
  await connectDB();

  const category = await Category.findOne({ id });

  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};

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
