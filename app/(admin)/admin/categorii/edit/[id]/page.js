import React from "react";
import { getCategory } from "@/utils/actions/category/get-category";
import CategoryForm from "@/components/forms/category-form";

const EditeazaCategorie = async ({ params }) => {
  const { id } = params;
  const category = getCategory.bind(null, id);

  const categoryData = await category();

  const formData = {
    id: "",
    name: categoryData.name,
    description: categoryData.description,
  };

  const categoryToUpdate = updateCategory.bind(null, { id: id });

  return <CategoryForm formData={formData} action={categoryToUpdate} />;
};

export default EditeazaCategorie;
