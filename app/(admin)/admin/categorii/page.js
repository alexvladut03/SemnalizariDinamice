import React from "react";
import CategoriesMapping from "./_components/CategoriesMapping";
import AddCategory from "./_components/AddCategory";

const Categorii = async () => {
  return (
    <div className="p-4 bg-gray-100">
      <div className="text-center text-2xl my-8 font-semibold">
        O lista cu categoriile adaugate
      </div>
      <div className="flex justify-end mb-4">
        <AddCategory />
      </div>
      <section className="bg-white rounded-lg shadow-sm shadow-gray-400">
        <div className="grid grid-cols-4 p-2 mb-2 rounded-t-lg font-bold bg-gray-400">
          <div>Nume</div>
          <div>Descriere</div>
          <div>Slug</div>
          <div>Actiuni</div>
        </div>
        <div>
          <CategoriesMapping />
        </div>
      </section>
    </div>
  );
};

export default Categorii;
