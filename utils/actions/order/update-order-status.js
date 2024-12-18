import prisma from "@/utils/prisma";
import sendOrderEmail from "@/utils/functions/email/send-order-email";
import generateOrderAWB from "@/utils/functions/fanCourier/generate-order-awb";

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

    const awb = await generateOrderAWB(orderData);

    const orderDataWithAwb = await prisma.order.update({
      where: {
        orderId: order.orderID,
        ntpId: payment.ntpID,
      },
      data: {
        awb: awb.response[0].awbNumber,
        status: [
          "Pending",
          "Payment Pending",
          "Payment Confirmed",
          "AWB Generated",
        ],
      },
      include: {
        products: true,
      },
    });

    const orderEmail = await sendOrderEmail(orderDataWithAwb);

    if (orderEmail.error) {
      throw new Error("Failed to send order email");
    }

    await prisma.order.update({
      where: {
        orderId: order.orderID,
        ntpId: payment.ntpID,
      },
      data: {
        status: [
          "Pending",
          "Payment Pending",
          "Payment Confirmed",
          "AWB Generated",
          "Email Sent",
          "Ready for Delivery",
        ],
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
