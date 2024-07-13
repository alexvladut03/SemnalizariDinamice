"use client";
import { MdDeleteForever } from "react-icons/md";
import { deleteProduct } from "../../../../actions/product";

const DeleteProductForm = ({ id }) => {
  const productToDelete = deleteProduct.bind(null, id);

  return (
    <form action={productToDelete} className="space-y-8">
      <button type="submit">
        <MdDeleteForever />
      </button>
    </form>
  );
};

export default DeleteProductForm;
