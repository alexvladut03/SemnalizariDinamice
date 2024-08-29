"use server";

import { connectDB } from "../../mongoose";
import { Category } from "../../models/category";

export const getCategory = async (id) => {
  await connectDB();

  const category = await Category.findOne({ id });

  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};
