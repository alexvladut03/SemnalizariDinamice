"use client";

import { deleteUser } from "../../../../actions/user";
import { RiDeleteBin5Fill } from "react-icons/ri";

const DeleteUserForm = ({ id }) => {
  const userToDelete = deleteUser.bind(null, id);

  return (
    <form action={userToDelete} className="text-red-500 text-2xl">
      <button type="submit">
        <RiDeleteBin5Fill />
      </button>
    </form>
  );
};

export default DeleteUserForm;
