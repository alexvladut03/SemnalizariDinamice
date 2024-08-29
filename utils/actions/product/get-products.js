"use server";

import { Product } from "../../models/product";
import { connectDB } from "../../mongoose";

export const getProducts = async () => {
  await connectDB();

  let products = await Product.find().populate("category");

  products = products.map((product) => {
    if (!product.category) {
      product.category = { id: "fara-categorie", name: "Fără categorie" };
    }
    return product;
  });

  return products;
};

export const getProductsWithoutDBData = async () => {
  await connectDB();

  const products = await Product.find().populate("category");

  const customProducts = products.map((product) => ({
    id: product.id,
    category: {
      id: product.category.id,
      name: product.category.name,
    },
    name: product.name,
    price: product.price,
    stock: product.stock,
    mainImage: {
      url: product.mainImage.url,
      name: product.mainImage.name,
    },
    gallery: product.gallery.map((image) => ({
      url: image.url,
      name: image.name,
    })),
    description: product.description,
    fitment: product.fitment,
    characteristics: product.characteristics,
  }));

  return customProducts;
};

export const getProduct = async (id) => {
  await connectDB();

  const product = await Product.findOne({ id });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const getProductCustom = async (id) => {
  await connectDB();

  const product = await Product.findOne({ id });

  const customProduct = {
    id: product.id,
    image: product.mainImage.url,
    name: product.name,
    price: product.price,
  };

  return customProduct;
};

export const getProductsWithIdsCustom = async (ids) => {
  await connectDB();

  const products = await Product.find({ id: { $in: ids } });

  const customProducts = products.map((product) => ({
    id: product.id,
    image: product.mainImage.url,
    name: product.name,
    price: product.price,
  }));

  return customProducts;
};

export const getProductsCategoryExceptProduct = async (id, category) => {
  await connectDB();

  const products = await Product.find({ category });
  const productsWithCategory = products.filter((product) => product.id !== id);

  return productsWithCategory;
};
