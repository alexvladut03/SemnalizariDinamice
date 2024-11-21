import prisma from "@/utils/prisma";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ searchParams }) => {
  console.log(searchParams.orderId);

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
      {`Confirm ${order.ntpStatus}`}
      <div>
        {order.status.map((status) => (
          <p key={status}>{status}</p>
        ))}
      </div>
    </div>
  );
};

export default page;
