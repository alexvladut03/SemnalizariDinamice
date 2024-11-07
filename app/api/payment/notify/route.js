import { updateOrderStatus } from "@/utils/actions/order/update-order-status";
import { rawTextBodyParser } from "netopia-card";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Notificare recepționată");

    // Parsăm body-ul request-ului
    const rawBody = await req.text();
    const { order, payment } = JSON.parse(rawBody);

    if (!order || !payment) {
      throw new Error("Invalid request body");
    }

    // Aici poți adăuga logica pentru actualizarea comenzii în baza ta de date
    await updateOrderStatus({
      orderId: order.orderId,
      status: payment.status,
    });

    return NextResponse.json({ errorCode: 0 });
  } catch (error) {
    console.error("Eroare la procesarea notificării:", error);
    return NextResponse.json(
      { errorCode: 1, message: error.message },
      { status: 400 }
    );
  }
}
