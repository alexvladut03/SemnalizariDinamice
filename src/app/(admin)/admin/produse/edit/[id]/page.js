import React from "react";
import {
  getProduct,
  updateProduct,
} from "../../../../../../../actions/product";
import ProductForm from "@/components/admin/forms/productForm";

const EditeazaProdus = async ({ params }) => {
  const { id } = params;
  const product = getProduct.bind(null, id);

  const productData = await product();

  console.log(productData);

  const formData = {
    id: productData.id,
    category: productData.category,
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

  return <ProductForm formData={formData} action={productToUpdate} />;
};

export default EditeazaProdus;
