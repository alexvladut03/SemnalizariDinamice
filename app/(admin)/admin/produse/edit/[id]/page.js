import React from "react";
import { getProduct } from "@/utils/functions/product/get-product";
import { getAllCategories } from "@/utils/functions/category/get-all-categories";
import { updateProduct } from "@/utils/actions/product/update-product";
import ProductForm from "@/components/forms/product-form";

const EditeazaProdus = async ({ params }) => {
  const { id } = params;
  const product = getProduct.bind(null, id);

  const productData = await product();

  const categories = await getAllCategories();
  const modifiedCategories = categories.map((category) => ({
    _id: category._id.toString(),
    id: category.id,
    name: category.name,
    description: category.description,
  }));

  const formData = {
    id: productData.id,
    category: productData.category._id.toString(),
    name: productData.name,
    price: productData.price,
    stock: productData.stock,
    mainImage: productData.mainImage,
    gallery: productData.gallery,
    description: productData.description,
    fitment: productData.fitment,
    characteristics: productData.characteristics,
  };

  const productToUpdate = updateProduct.bind(null, { id: formData.id });

  return (
    <ProductForm
      formData={formData}
      action={productToUpdate}
      categories={modifiedCategories}
    />
  );
};

export default EditeazaProdus;
