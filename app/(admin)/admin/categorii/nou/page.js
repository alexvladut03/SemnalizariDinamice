import React from "react";
import { addCategory } from "@/lib/categories";
import CategoryForm from "@/components/forms/category-form";

const AdaugaCategorie = () => {
  const formData = {
    id: "",
    name: "",
    description: "",
  };

  return <CategoryForm formData={formData} action={addCategory} />;
};

export default AdaugaCategorie;
