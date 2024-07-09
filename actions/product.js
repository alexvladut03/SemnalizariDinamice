"use server";

import { Product } from "@/lib/models/Product";
import { connectDB } from "@/lib/mongodb";

export const addProduct = async (formData) => {
  const id = formData.get("id");
  const category = formData.get("category");
  const name = formData.get("name");
  const price = formData.get("price");
  const stock = formData.get("stock");
  const mainImage = formData.get("mainImage");
  const gallery = formData.getAll("gallery");
  const description = formData.get("description");
  const fitment = formData.get("fitment");
  const characteristics = formData.get("characteristics");

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
  console.log("Product created successfully");
};

export const getProducts = async () => {
  await connectDB();

  const products = await Product.find();
  return products;
};
