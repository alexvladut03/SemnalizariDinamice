import { Category } from "@/utils/models/category";
import { connectDB } from "@/utils/mongoose";

export const getAllCategories = async () => {
  await connectDB();

  const categories = await Category.find({});
  return categories;
};
