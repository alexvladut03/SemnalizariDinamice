"use client";
import { MdDeleteForever } from "react-icons/md";
import { deleteProduct } from "../../../../actions/product";

const DeleteProductForm = ({ id }) => {
  console.log("Deleting product", id);
  const productToDelete = deleteProduct.bind(null, id);

  return (
    <form action={productToDelete} className="text-red-500 text-2xl">
      <button type="submit">
        <MdDeleteForever />
      </button>
    </form>
  );
};

export default DeleteProductForm;
