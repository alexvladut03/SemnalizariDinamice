import Link from "next/link";
import React from "react";
import { FaCartPlus } from "react-icons/fa";
import GeneralButton from "../../../../components/custom ui/general-button";

export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center relative bg-gray-100">
      <div className="flex flex-col items-center text-center ">
        <FaCartPlus className="text-7xl text-amber-400" />
        <h1 className="text-2xl font-bold text-gray-800">
          Coșul tău de cumpărături a rămas fără produse!
        </h1>
        <p className="mt-2 text-gray-600">
          Încă avem sute de produse care te așteaptă!
        </p>
        <p className="mt-2 text-gray-600">Vezi care ți se potrivește!</p>
        <Link href={"/"} className="mt-2">
          <GeneralButton text="Continuă Cumpărăturile" />
        </Link>
      </div>
    </div>
  );
}
