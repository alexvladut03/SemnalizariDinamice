import React from "react";
import CategoryForm from "@/components/forms/category-form";
import { addCategory } from "@/utils/actions/category/add-category";

const AdaugaCategorie = () => {
  const formData = {
    id: "",
    name: "",
    description: "",
  };

  return <CategoryForm formData={formData} action={addCategory} />;
};

export default AdaugaCategorie;
