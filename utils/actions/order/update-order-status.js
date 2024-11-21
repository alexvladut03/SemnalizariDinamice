import prisma from "@/utils/prisma";

export const updateOrderStatus = async ({ order, payment }) => {
  const orderData = await prisma.order.findUnique({
    where: {
      orderId: order.orderID,
      ntpId: payment.ntpID,
      totalCost: payment.amount,
    },
  });

  if (!orderData) {
    throw new Error("Order not found");
  }

  console.log(payment.status);

  return order;
};
