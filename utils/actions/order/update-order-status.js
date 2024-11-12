"use server";

export const updateOrderStatus = async ({ orderId, status }) => {
  const order = await prisma.order.update({
    where: {
      nptID: status.nptID,
    },
    data: {
      amount: status.amount,
      code: status.code,
      message: status.message,
      status: status.status,
      operationDate: status.operationDate,
      orderId,
    },
  });

  return order;
};
