import { Product } from "@/utils/models/product";
import { connectDB } from "@/utils/mongoose";

export const getProduct = async (id) => {
  await connectDB();

  const product = await Product.findOne({ id });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};
