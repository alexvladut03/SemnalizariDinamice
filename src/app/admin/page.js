import Image from "next/image";
import React from "react";

const AdminDashboard = () => {
  return (
    <dashboard className="flex h-screen bg-gray-100">
      <sidebar className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-2xl font-bold">Admin Dashboard</div>
        <ul>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Dashboard</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Products</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Settings</li>
        </ul>
      </sidebar>
      <main className="flex-1 flex flex-col">
        <topbar className="flex items-center justify-between p-4 bg-white shadow-md">
          <div className="text-xl font-bold">Dashboard</div>
          <div className="ml-4 flex items-center">
            <Image
              src="/DashboardProfileImage.jpeg"
              width={40}
              height={40}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </topbar>
        <content className="p-4 flex-1 overflow-y-auto">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="p-4 bg-white shadow rounded-lg text-center">
              <div className="text-2xl font-bold">2050</div>
              <div>Total Orders</div>
            </div>
            <div className="p-4 bg-white shadow rounded-lg text-center">
              <div className="text-2xl font-bold">3250</div>
              <div>Total Expenses</div>
            </div>
            <div className="p-4 bg-white shadow rounded-lg text-center">
              <div className="text-2xl font-bold">87.5%</div>
              <div>Total Revenue</div>
            </div>
            <div className="p-4 bg-white shadow rounded-lg text-center">
              <div className="text-2xl font-bold">2550</div>
              <div>New Users</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 shadow rounded-lg">
              <div className="text-lg font-bold">Product Sales</div>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <div className="text-lg font-bold">Top Selling Categories</div>
            </div>
          </div>
        </content>
      </main>
    </dashboard>
  );
};

export default AdminDashboard;
