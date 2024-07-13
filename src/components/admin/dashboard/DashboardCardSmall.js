import React from "react";
import { FaRegMoneyBillAlt, FaUserTie } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { IoBagHandle } from "react-icons/io5";

export default function dashboardCardSmall() {
  return (
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
  );
}
