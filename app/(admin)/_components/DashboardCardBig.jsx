import Image from "next/image";
import React from "react";

export default function DashboardCardBig() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white shadow-sm shadow-gray-400 p-4 rounded-lg">
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
                <div className="text-sm text-gray-500">Alin Bratu - $75</div>
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
                <div className="text-sm text-gray-500">Vlad Lina - $200</div>
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
      <div className="bg-white shadow-sm shadow-gray-400 p-4 rounded-lg">
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
              <div className="text-sm text-gray-500">Embleme - In Stock</div>
            </div>
          </li>
        </ul>
      </div>
      <div className="bg-white shadow-sm shadow-gray-400 p-4 rounded-lg">
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
  );
}
