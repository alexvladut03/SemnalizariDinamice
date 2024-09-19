"use client";
import React, { useState } from "react";
import { FaHome, FaProductHunt, FaRegFileAlt, FaUser } from "react-icons/fa";
import {
  MdCategory,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdPermMedia,
} from "react-icons/md";
import Link from "next/link";

const AdminSidebar = () => {
  const [activePage, setActivePage] = useState();
  const onClickSetActivePage = () => {
    setActivePage(!activePage);
  };
  return (
    <div className="flex h-screen bg-gray-100 sticky top-0 ">
      <div className="w-72 bg-gray-800 text-white flex flex-col p-4 ">
        <p className="p-4 text-2xl font-bold">Admin Dashboard</p>
        <Link
          href={"/admin"}
          className="flex items-center hover:bg-gray-700 cursor-pointer p-4 gap-2 text-lg"
        >
          <FaHome />
          <div>Dashboard</div>
        </Link>
        <div
          onClick={onClickSetActivePage}
          className="flex items-center hover:bg-gray-700 cursor-pointer p-4 gap-2 text-lg"
        >
          <FaRegFileAlt />
          <div>Pages</div>
          {activePage ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
        </div>
        <div
          className={`transition-all ease-out duration-500 overflow-hidden ${
            activePage ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 ml-7 hover:bg-gray-700 cursor-pointer text-sm">
            Pagina principala
          </div>
          <div className="p-4 ml-7 hover:bg-gray-700 cursor-pointer text-sm">
            Pagina de produse
          </div>
        </div>
        <Link
          href={"/admin/media"}
          className="flex items-center hover:bg-gray-700 cursor-pointer p-4 gap-2 text-lg"
        >
          <MdPermMedia />
          <div>Media</div>
        </Link>
        <Link
          href={"/admin/produse"}
          className="flex items-center hover:bg-gray-700 cursor-pointer p-4 gap-2 text-lg"
        >
          <FaProductHunt />
          <div>Produse</div>
        </Link>
        <Link
          href={"/admin/categorii"}
          className="flex items-center hover:bg-gray-700 cursor-pointer p-4 gap-2 text-lg"
        >
          <MdCategory />
          <div>Categorii</div>
        </Link>
        <Link
          href={"/admin/atribute"}
          className="flex items-center hover:bg-gray-700 cursor-pointer p-4 gap-2 text-lg"
        >
          <MdCategory />
          <div>Atribute</div>
        </Link>
        <Link
          prefetch={true}
          href={"/admin/utilizatori"}
          className="flex items-center hover:bg-gray-700 cursor-pointer p-4 gap-2 text-lg"
        >
          <FaUser />
          <div>Utilizatori</div>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
