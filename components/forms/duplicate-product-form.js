"use client";

import { duplicateProduct } from "@/utils/actions/product/duplicate-products";
import { IoDuplicate } from "react-icons/io5";

const DuplicateProductForm = ({ id }) => {
  const productToDuplicate = duplicateProduct.bind(null, id);

  return (
    <form action={productToDuplicate} className="text-2xl text-blue-600">
      <button type="submit">
        <IoDuplicate />
      </button>
    </form>
  );
};

export default DuplicateProductForm;
