"use server";

import { Product } from "@/utils/models/product";
import { connectDB } from "@/utils/mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteProduct = async (id) => {
  console.log("Deleting product", id);

  await connectDB();

  const product = await Product.findOne({ id });

  if (!product) {
    throw new Error("Product not found");
  } else {
    await Product.deleteOne({ id });
  }

  console.log("Product deleted successfully");
  revalidatePath("/");
  redirect("/admin/produse");
};
