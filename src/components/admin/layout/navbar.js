import Image from "next/image";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";

const NavbarAdmin = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="text-xl font-bold">Dashboard</div>
      <div className="flex items-center">
        <Image
          src="/DashboardProfileImage.jpeg"
          width={40}
          height={40}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-2">
          <div className="font-bold">Ionita Alexandru</div>
          <div className="text-sm text-gray-500">Admin</div>
        </div>
        <button className="hover:text-amber-500 text-2xl ml-6 animate-spin">
          <IoSettingsOutline />
        </button>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
