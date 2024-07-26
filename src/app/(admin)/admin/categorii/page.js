import Link from "next/link";
import React from "react";
import { getCategories } from "../../../../../actions/category";
import { FaEdit } from "react-icons/fa";
import DeleteCategoryForm from "@/components/admin/categories/deleteCategoryForm";

const Categorii = async () => {
  const categories = await getCategories();

  return (
    <div className="p-4 bg-gray-100">
      <div className="text-center text-2xl my-8 font-semibold">
        O lista cu categoriile adaugate
      </div>
      <div className="flex justify-end mb-4">
        <Link href="/admin/categorii/nou">
          <button className="p-2 w-48 text-lg font-semibold bg-gray-400 rounded-lg border-2 hover:border-black">
            Adauga categorie
          </button>
        </Link>
      </div>
      <section className="bg-white rounded-lg shadow-sm shadow-gray-400">
        <div className="grid grid-cols-7 p-2 mb-2 rounded-t-lg font-bold bg-gray-400">
          <div>ID</div>
          <div>Nume</div>
          <div>Descriere</div>
          <div>Actiuni</div>
        </div>
        <div>
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-2 border-b border-gray-200 grid grid-cols-7 items-center"
            >
              <div>{category.id}</div>
              <div>{category.name}</div>
              <div>{category.description}</div>
              <div className="flex  gap-3">
                <Link
                  href={`/admin/categorii/edit/${category.id}`}
                  className="text-2xl text-emerald-600"
                >
                  <FaEdit />
                </Link>
                <DeleteCategoryForm id={category.id} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Categorii;
