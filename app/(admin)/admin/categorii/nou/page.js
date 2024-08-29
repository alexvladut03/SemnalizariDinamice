import CategoryForm from "@/components/admin/forms/categoryForm";
import React from "react";
import { addCategory } from "@/lib/categories";

const AdaugaCategorie = () => {
  const formData = {
    id: "",
    name: "",
    description: "",
  };

  return <CategoryForm formData={formData} action={addCategory} />;
};

export default AdaugaCategorie;
