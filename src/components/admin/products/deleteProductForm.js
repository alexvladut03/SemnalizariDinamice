"use client";
import { FaEdit } from "react-icons/fa";
import { deleteProduct } from "../../../../actions/product";

const DeleteProductForm = ({ id }) => {
  console.log("Deleting product", id);
  const productToDelete = deleteProduct.bind(null, id);

  return (
    <form action={productToDelete} className="space-y-8">
      <button type="submit">
        <FaEdit />
      </button>
    </form>
  );
};

export default DeleteProductForm;
