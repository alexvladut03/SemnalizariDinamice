"use client";
import { duplicateProduct } from "../../../../actions/product";
import { IoDuplicate } from "react-icons/io5";

const DuplicateProductForm = ({ id }) => {
  const productToDuplicate = duplicateProduct.bind(null, id);

  return (
    <form action={productToDuplicate} className="space-y-8">
      <button type="submit">
        <IoDuplicate />
      </button>
    </form>
  );
};

export default DuplicateProductForm;
