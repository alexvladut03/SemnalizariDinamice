"use server";

import { Product } from "@/utils/models/product";
import { connectDB } from "@/utils/mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateProduct = async (id, formData) => {
  const newProductID = formData.get("id");
  const newProductCategory = formData.get("category");
  const newProductName = formData.get("name");
  const newProductPrice = formData.get("price");
  const newProductStock = formData.get("stock");
  const newProductMainImage = JSON.parse(formData.get("mainImage"));
  const newProductGallery = JSON.parse(formData.getAll("gallery"));
  const newProductDescription = formData.get("description");
  const newProductFitment = formData.get("fitment");
  const newProductCharacteristics = formData.get("characteristics");

  console.log("Form data action", formData);

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
  revalidatePath("/");
  redirect("/admin/produse");
};
