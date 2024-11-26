import prisma from "@/utils/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

const page = async ({ searchParams }) => {
  const order = await prisma.order.findUnique({
    where: {
      orderId: searchParams.orderId,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div>
      {order.paymentMethod === "card" ? (
        order.ntpStatus === 3 ? (
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <FaRegCheckCircle className="text-7xl mb-4 text-amber-500" />
            <h1 className="text-2xl font-bold">Vă mulțumim pentru comandă!</h1>
            <p className="text-lg text-center mt-2">
              Verificați emailul pentru mai multe detalii.
            </p>
            <Link href="/" className="text-amber-500 mt-4">
              Înapoi la pagina principală
            </Link>
          </div>
        ) : (
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <FaRegTimesCircle className="text-7xl mb-4 text-red-500" />
            <h1 className="text-2xl font-bold">Comanda a eșuat!</h1>
            <p className="text-lg text-center mt-2">
              Ne pare rău, a apărut o problemă cu comanda dvs. Vă rugăm să
              încercați din nou.
            </p>
            <Link href="/cos" className="text-red-500 mt-4">
              Înapoi la coșul de cumpărături
            </Link>
          </div>
        )
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <FaRegCheckCircle className="text-7xl mb-4 text-amber-500" />
          <h1 className="text-2xl font-bold">Vă mulțumim pentru comandă!</h1>
          <p className="text-lg text-center mt-2">
            Verificați emailul pentru mai multe detalii.
          </p>
          <Link href="/" className="text-amber-500 mt-4">
            Înapoi la pagina principală
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
