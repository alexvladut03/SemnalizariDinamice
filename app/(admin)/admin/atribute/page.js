import { getAllAttributes } from "@/utils/functions/attribute/get-all-attributes";
import React from "react";
import AttributeMapping from "./_components/AttributeMapping";
import AddAttribute from "./_components/AddAttribute";

const Attributes = async () => {
  const attributes = await getAllAttributes();

  return (
    <div className="p-4 bg-gray-100">
      <div className="text-center text-2xl my-8 font-semibold">
        O lista cu categoriile adaugate
      </div>
      <div className="flex justify-end mb-4">
        <AddAttribute />
      </div>
      <section className="bg-white rounded-lg shadow-sm shadow-gray-400">
        <div className="grid grid-cols-4 p-2 mb-2 rounded-t-lg font-bold bg-gray-400">
          <div>Nume</div>
          <div>Slug</div>
          <div>Valori</div>
          <div>Actiuni</div>
        </div>
        <div>
          <AttributeMapping attributes={attributes} />
        </div>
      </section>
    </div>
  );
};

export default Attributes;
