"use server";

import { Product } from "@/utils/models/product";
import { connectDB } from "@/utils/mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const duplicateProduct = async (id) => {
  console.log("Duplicating product", id);

  await connectDB();

  const product = await Product.findOne({ id });

  if (!product) {
    throw new Error("Product not found");
  }

  console.log("Product found", product);

  const newProduct = {
    ...product._doc,
    id: `${product.id}-copy`,
    name: `${product.name} (Copy)`,
    _id: undefined,
    __v: undefined,
  };

  while (await Product.findOne({ id: newProduct.id })) {
    newProduct.id = `${newProduct.id}-copy`;
    newProduct.name = `${newProduct.name} (Copy)`;
  }

  await Product.create(newProduct);

  revalidatePath("/");
  redirect("/admin/produse");
};
