import React from "react";
import { getUsers } from "../../../../../actions/user";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import DeleteUserForm from "@/components/admin/users/deleteUserForm";

const page = async () => {
  const users = await getUsers();

  return (
    <main className="p-4 bg-gray-100">
      <div className="text-center text-2xl my-8 font-semibold">
        O lista cu utilizatorii adaugati
      </div>
      <div className="flex justify-end mb-4">
        <Link href="/admin/utilizatori/nou">
          <button className="p-2 w-48 text-lg font-semibold bg-gray-400 rounded-lg">
            Adauga utilizator
          </button>
        </Link>
      </div>

      <section className="bg-white rounded-lg">
        <div className="grid grid-cols-7 p-2 mb-2 rounded-t-lg font-bold bg-gray-400">
          <div>Nume</div>
          <div>Username</div>
          <div className="col-start-7">Actiuni</div>
        </div>
        {users.map((user, index) => (
          <div
            key={index}
            className="p-2 border-b border-gray-200 grid grid-cols-7 items-center"
          >
            <div>{user.name}</div>
            <div>{user.username}</div>
            <div className="flex col-start-7 ">
              <Link
                href={`/admin/utilizatori/edit/${user.id}`}
                className="text-2xl mr-2"
              >
                <FaEdit />
              </Link>
              <DeleteUserForm id={user.id} />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default page;
