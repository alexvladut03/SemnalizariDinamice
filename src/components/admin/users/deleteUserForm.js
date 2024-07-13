"use client";
import { MdDeleteForever } from "react-icons/md";
import { deleteUser } from "../../../../actions/user";

const DeleteUserForm = ({ id }) => {
  const userToDelete = deleteUser.bind(null, id);

  return (
    <form action={userToDelete} className="text-red-500 text-2xl">
      <button type="submit">
        <MdDeleteForever />
      </button>
    </form>
  );
};

export default DeleteUserForm;
