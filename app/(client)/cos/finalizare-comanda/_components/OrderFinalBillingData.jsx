"use client";
import React, { useState } from "react";

export default function OrderFinalBillingData() {
  const [isPersoanaFizica, setIsPersoanaFizica] = useState(true);
  const [isPersoanaJuridica, setIsPersoanaJuridica] = useState(false);

  const handlePersoanaFizica = () => {
    setIsPersoanaFizica(true);
    setIsPersoanaJuridica(false);
  };

  const handlePersoanaJuridica = () => {
    setIsPersoanaFizica(false);
    setIsPersoanaJuridica(true);
  };

  return (
    <div className="pb-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-sm shadow-amber-500 p-6">
        <div className="flex text-xl font-medium pb-4">
          <div className="bg-amber-500 w-7 h-full rounded-full flex justify-center items-center text-white">
            2
          </div>
          <div className="pl-4">Date facturare</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6 font-semibold">
          <button
            onClick={handlePersoanaFizica}
            className={`lg:p-4 p-2 border rounded-lg text-center ${
              isPersoanaFizica ? "bg-amber-500 border-black" : ""
            }`}
          >
            Aceleasi cu datele de livrare
          </button>

          <button
            onClick={handlePersoanaJuridica}
            className={`lg:p-4 p-2 border rounded-lg text-center ${
              isPersoanaJuridica ? "bg-amber-500 border-black" : ""
            }`}
          >
            Alte optiuni
          </button>
        </div>
        {isPersoanaFizica && (
          <div className="p-4 bg-gray-50 rounded-lg">
            Detalii persoana fizica
          </div>
        )}
        {isPersoanaJuridica && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <form className="lg:grid lg:grid-cols-2 gap-4 space-y-4 lg:space-y-0">
              <div className="col-span-2 font-medium">Detalii companie</div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nume companie
                </label>
                <input
                  type="text"
                  placeholder="Nume companie"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cod unic de Inregistrare
                </label>
                <input
                  type="text"
                  placeholder="Cod unic de Inregistrare"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Numar de inregistrare in Registrul Comertului
                </label>
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-2">
                  <input
                    type="text"
                    placeholder="J"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Nr."
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Nr."
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="An"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Banca
                </label>
                <input
                  type="text"
                  placeholder="Banca"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cont
                </label>
                <input
                  type="text"
                  placeholder="Cont"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-2 font-medium">Sediul central:</div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Judet
                </label>
                <input
                  type="text"
                  placeholder="Judet"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Localitate
                </label>
                <input
                  type="text"
                  placeholder="Localitate"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Strada
                </label>
                <input
                  type="text"
                  placeholder="Strada"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Numar
                </label>
                <input
                  type="text"
                  placeholder="Numar"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
