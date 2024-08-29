"use client";
import { deleteCategory } from "@/utils/actions/category/delete-category";
import { RiDeleteBin5Fill } from "react-icons/ri";

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
