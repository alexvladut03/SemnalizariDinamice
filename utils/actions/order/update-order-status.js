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

  if (payment.status === 3) {
    await prisma.order.update({
      where: {
        orderId: order.orderID,
        ntpId: payment.ntpID,
      },
      data: {
        ntpStatus: payment.status,
        status: ["Pending", "Payment Pending", "Payment Confirmed"],
      },
    });
  } else {
    await prisma.order.update({
      where: {
        orderId: order.orderID,
        ntpId: payment.ntpID,
      },
      data: {
        ntpStatus: payment.status,
        status: ["Pending", "Payment Pending", "Payment Failed"],
      },
    });
  }
};
