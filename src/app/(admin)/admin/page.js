"use client";
import Image from "next/image";
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

const AdminDashboard = () => {
  return (
    <section className="flex flex-col flex-1 ">
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="p-4 bg-white shadow rounded-lg flex items-center">
            <div className="bg-purple-100 text-purple-500 rounded-lg p-2 w-12 h-12 flex-shrink-0">
              <IoBagHandle className="w-full h-full" />
            </div>
            <div className="ml-4">
              <div>Total Produse Vandute</div>
              <div className="text-2xl font-bold">27</div>
              <div className="text-green-500">
                A crescut cu 2% față de luna trecută
              </div>
            </div>
          </div>
          <div className="p-4 bg-white shadow rounded-lg flex items-center">
            <div className="bg-green-100 text-green-500 rounded-lg p-2 w-12 h-12 flex-shrink-0">
              <FaRegMoneyBillAlt className="w-full h-full" />
            </div>
            <div className="ml-4">
              <div>Bani Primiti</div>
              <div className="text-2xl font-bold">3200 RON</div>
              <div className="text-green-500">
                A crescut cu 12% față de luna trecută
              </div>
            </div>
          </div>
          <div className="p-4 bg-white shadow rounded-lg flex items-center">
            <div className="bg-blue-100 text-blue-500 rounded-lg p-2 w-12 h-12 flex-shrink-0">
              <FaUserTie className="w-full h-full" />
            </div>
            <div className="ml-4">
              <div>Vizitatori pe site</div>
              <div className="text-2xl font-bold">1500</div>
              <div className="text-green-500">
                A crescut cu 52% față de luna trecută
              </div>
            </div>
          </div>
          <div className="p-4 bg-white shadow rounded-lg flex items-center">
            <div className="bg-yellow-100 text-yellow-500 rounded-lg p-2 w-12 h-12 flex-shrink-0">
              <GrCart className="w-full h-full" />
            </div>
            <div className="ml-4">
              <div>Total comenzi</div>
              <div className="text-2xl font-bold">28</div>
              <div className="text-red-500">
                A scazut cu 5% față de luna trecută
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="text-lg font-bold">Comenzi Recente</div>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/DashboardProfileImage.jpeg"
                    width={40}
                    height={40}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-bold">Order #12345</div>
                    <div className="text-sm text-gray-500">
                      Marian Pescaru - $120
                    </div>
                  </div>
                </div>
                <div className="text-green-500">Completed</div>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/DashboardProfileImage.jpeg"
                    width={40}
                    height={40}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-bold">Order #12346</div>
                    <div className="text-sm text-gray-500">
                      Alin Bratu - $75
                    </div>
                  </div>
                </div>
                <div className="text-yellow-500">Pending</div>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/DashboardProfileImage.jpeg"
                    width={40}
                    height={40}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-bold">Order #12347</div>
                    <div className="text-sm text-gray-500">
                      Vlad Lina - $200
                    </div>
                  </div>
                </div>
                <div className="text-red-500">Canceled</div>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/DashboardProfileImage.jpeg"
                    width={40}
                    height={40}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-bold">Order #12348</div>
                    <div className="text-sm text-gray-500">
                      Andrei Mocanel - $50
                    </div>
                  </div>
                </div>
                <div className="text-green-500">Completed</div>
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="text-lg font-bold">Cele mai vandute produse</div>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center space-x-4">
                <Image
                  src="/img/SemnalizariDinamiceB8.5.webp"
                  width={40}
                  height={40}
                  alt="Semnalizari Dinamice"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-bold">Semnalizari Dinamice</div>
                  <div className="text-sm text-gray-500">
                    Semnalizari - In Stock
                  </div>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <Image
                  src="/img/CapaceNegreMiciAudi.webp"
                  width={40}
                  height={40}
                  alt="Capace Negre"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-bold">Capace Negre</div>
                  <div className="text-sm text-gray-500">
                    Capace Negre - Out of Stock
                  </div>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <Image
                  src="/img/CapaceNegreAudi.webp"
                  width={40}
                  height={40}
                  alt="Capace Stea"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-bold">Capace Stea</div>
                  <div className="text-sm text-gray-500">
                    Capace Stea - In Stock
                  </div>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <Image
                  src="/img/EmblemaFataAudi.webp"
                  width={40}
                  height={40}
                  alt="Embleme"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-bold">Embleme</div>
                  <div className="text-sm text-gray-500">
                    Embleme - In Stock
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="text-lg font-bold">Clienti fideli</div>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/DashboardProfileImage.jpeg"
                    width={40}
                    height={40}
                    alt="Gabriel Macovei"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-bold">Gabriel Macovei</div>
                    <div className="text-sm text-gray-500">10 Cumparate</div>
                  </div>
                </div>
                <div className="text-green-500">$1200</div>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/DashboardProfileImage.jpeg"
                    width={40}
                    height={40}
                    alt="Suciu Robert"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-bold">Suciu Robert</div>
                    <div className="text-sm text-gray-500">7 Cumparate</div>
                  </div>
                </div>
                <div className="text-green-500">$750</div>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/DashboardProfileImage.jpeg"
                    width={40}
                    height={40}
                    alt="Dan Danut"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-bold">Dan Danut</div>
                    <div className="text-sm text-gray-500">4 Cumparate</div>
                  </div>
                </div>
                <div className="text-green-500">$950</div>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/DashboardProfileImage.jpeg"
                    width={40}
                    height={40}
                    alt="Holban Iulian"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-bold">Holban Iulian</div>
                    <div className="text-sm text-gray-500">4 Cumparate</div>
                  </div>
                </div>
                <div className="text-green-500">$500</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
