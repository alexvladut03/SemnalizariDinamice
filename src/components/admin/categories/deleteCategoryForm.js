"use client";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { deleteCategory } from "../../../../actions/category";

const DeleteCategoryForm = ({ id }) => {
  const categoryToDelete = deleteCategory.bind(null, id);

  return (
    <form action={categoryToDelete} className="text-red-500 text-2xl">
      <button type="submit">
        <RiDeleteBin5Fill />
      </button>
    </form>
  );
};

export default DeleteCategoryForm;
