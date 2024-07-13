"use client";
import React, { useState } from "react";

import { IoBagHandle, IoSettingsOutline } from "react-icons/io5";
import {
  FaHome,
  FaRegFileAlt,
  FaRegMoneyBillAlt,
  FaUserTie,
} from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdOutlineMail,
} from "react-icons/md";

const Sidebar = () => {
  const [activePage, setActivePage] = useState();
  const onClickSetActivePage = () => {
    setActivePage(!activePage);
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-72 bg-gray-800 text-white flex flex-col p-4 ">
        <p className="p-4 text-2xl font-bold">Admin Dashboard</p>
        <div className="flex items-center hover:bg-gray-700 cursor-pointer p-4 gap-2 text-lg">
          <FaHome />
          <div>Dashboard</div>
        </div>
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
            Main Page
          </div>
          <div className="p-4 ml-7 hover:bg-gray-700 cursor-pointer text-sm">
            Product Page
          </div>
        </div>
        <div className="flex items-center hover:bg-gray-700 cursor-pointer p-4 gap-2 text-lg">
          <MdOutlineMail />
          <div>Mail</div>
        </div>
        <div className="flex items-center hover:bg-gray-700 cursor-pointer p-4 gap-2 text-lg">
          <IoSettingsOutline />
          <div>Settings</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
