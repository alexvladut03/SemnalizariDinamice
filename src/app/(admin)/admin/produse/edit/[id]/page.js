import React from "react";
import {
  getProduct,
  updateProduct,
} from "../../../../../../../actions/product";
import ProductForm from "@/components/admin/forms/productForm";
import { getCategories } from "../../../../../../../actions/category";

const EditeazaProdus = async ({ params }) => {
  const { id } = params;
  const product = getProduct.bind(null, id);

  const productData = await product();

  const categories = await getCategories();
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
