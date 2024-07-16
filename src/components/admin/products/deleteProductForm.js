"use client";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { deleteProduct } from "../../../../actions/product";

const DeleteProductForm = ({ id }) => {
  const productToDelete = deleteProduct.bind(null, id);

  return (
    <form action={productToDelete} className="text-red-500 text-2xl">
      <button type="submit">
        <RiDeleteBin5Fill />
      </button>
    </form>
  );
};

export default DeleteProductForm;
