"use server";

import { Product } from "@/lib/models/Product";
import { connectDB } from "@/lib/mongodb";
import { redirect } from "next/navigation";

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
  redirect("/admin/produse");
};

export const getProducts = async () => {
  await connectDB();

  const products = await Product.find();
  return products;
};

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
  redirect("/admin/produse");
};

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
    gallery: product.gallery.map((image) => `${image}-copy`),
    _id: undefined,
    __v: undefined,
  };

  while (await Product.findOne({ id: newProduct.id })) {
    newProduct.id = `${newProduct.id}-copy`;
    newProduct.name = `${newProduct.name} (Copy)`;
    newProduct.gallery = newProduct.gallery.map((image) => `${image}-copy`);
  }

  await Product.create(newProduct);

  redirect("/admin/produse");
};

export const getProduct = async (id) => {
  await connectDB();

  const product = await Product.findOne({ id });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const updateProduct = async (id, formData) => {
  const newProductID = formData.get("id");
  const newProductCategory = formData.get("category");
  const newProductName = formData.get("name");
  const newProductPrice = formData.get("price");
  const newProductStock = formData.get("stock");
  const newProductMainImage = formData.get("mainImage");
  const newProductGallery = formData.getAll("gallery");
  const newProductDescription = formData.get("description");
  const newProductFitment = formData.get("fitment");
  const newProductCharacteristics = formData.get("characteristics");

  await connectDB();

  if (
    !newProductID ||
    !newProductID ||
    !newProductCategory ||
    !newProductName ||
    !newProductPrice ||
    !newProductStock ||
    !newProductMainImage ||
    !newProductDescription ||
    !newProductFitment ||
    !newProductCharacteristics
  ) {
    throw new Error("All fields are required");
  }

  if (newProductGallery.length < 1) {
    throw new Error("Gallery must have at least one image");
  }

  if (isNaN(newProductPrice) || isNaN(newProductStock)) {
    throw new Error("Price and stock must be numbers");
  }

  const newProduct = {
    id: newProductID,
    category: newProductCategory,
    name: newProductName,
    price: newProductPrice,
    stock: newProductStock,
    mainImage: newProductMainImage,
    gallery: newProductGallery,
    description: newProductDescription,
    fitment: newProductFitment,
    characteristics: newProductCharacteristics,
  };

  console.log("Updating product", id);
  console.log("Product data", newProduct);

  await Product.findOneAndUpdate(id, newProduct);

  console.log("Product updated successfully");
  redirect("/admin/produse");
};
