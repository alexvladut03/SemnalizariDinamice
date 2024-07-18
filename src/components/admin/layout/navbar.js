import Image from "next/image";
import React from "react";
import { logout } from "../../../../actions/user";
import { FiLogOut } from "react-icons/fi";

const NavbarAdmin = async ({ username, role }) => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-10">
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
          <div className="font-bold">{username}</div>
          <div className="text-sm text-gray-500">Admin</div>
        </div>
        <form action={logout}>
          <button type="submit" className="px-5 flex items-center text-xl">
            <FiLogOut />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
