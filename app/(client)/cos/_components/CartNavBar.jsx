import React from "react";

export default function CartNavbar({ activeStep }) {
  const steps = [{ step: 2 }, { step: 3 }];
  return (
    <div className="">
      <div className="flex gap-1  max-w-7xl mx-auto mt-10 relative ">
        {activeStep === 2 ? (
          <>
            <div className="py-1 w-[33%] bg-amber-500 rounded"></div>
            <div className="py-1 w-[33%] bg-gray-300 rounded"></div>
            <div className="py-1 w-[33%] bg-gray-300 rounded"></div>
          </>
        ) : (
          <>
            <div className="py-1 w-[33%] bg-amber-500 rounded"></div>
            <div className="py-1 w-[33%] bg-amber-500 rounded"></div>
            <div className="py-1 w-[33%] bg-gray-300 rounded"></div>
          </>
        )}
        <div className="absolute left-0 top-3">Cosul Meu</div>
        <div className="absolute left-[28.5%] top-3">Detalii Comanda</div>
        <div className="absolute right-[28.5%] top-3">Sumar Comanda</div>
        <div className="absolute right-0 top-3">Comanda plasata</div>
      </div>
    </div>
  );
}
