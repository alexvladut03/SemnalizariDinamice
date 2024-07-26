import React from "react";

import CategoryForm from "@/components/admin/forms/categoryForm";
import {
  getCategory,
  updateCategory,
} from "../../../../../../../actions/category";

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
