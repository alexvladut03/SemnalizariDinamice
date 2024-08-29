"use server";

import { Product } from "@/utils/models/product";
import { connectDB } from "@/utils/mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addProduct = async (formData) => {
  const id = formData.get("id");
  const category = formData.get("category");
  const name = formData.get("name");
  const price = formData.get("price");
  const stock = formData.get("stock");
  const mainImage = JSON.parse(formData.get("mainImage"));
  const gallery = JSON.parse(formData.getAll("gallery"));
  const description = formData.get("description");
  const fitment = formData.get("fitment");
  const characteristics = formData.get("characteristics");

  console.log("Form data action", formData);

  await connectDB();

  if (
    !id ||
    !category ||
    !name ||
    !price ||
    !stock ||
    !mainImage ||
    !description ||
    !fitment ||
    !characteristics
  ) {
    throw new Error("All fields are required");
  }

  const existingProduct = await Product.findOne({ id });

  if (existingProduct) {
    throw new Error("Product with this ID already exists");
  }

  if (gallery.length < 1) {
    throw new Error("Gallery must have at least one image");
  }

  if (isNaN(price) || isNaN(stock)) {
    throw new Error("Price and stock must be numbers");
  }

  const product = {
    id,
    category,
    name,
    price,
    stock,
    mainImage,
    gallery,
    description,
    fitment,
    characteristics,
  };

  await Product.create(product);
  revalidatePath("/");
  console.log("Product created successfully", product);
  redirect("/admin/produse");
};
