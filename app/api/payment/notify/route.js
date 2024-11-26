import { updateOrderStatus } from "@/utils/actions/order/update-order-status";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parsăm body-ul request-ului
    const rawBody = await req.text();
    const { order, payment } = JSON.parse(rawBody);
    if (!order || !payment) {
      throw new Error("Invalid request body");
    }
    await updateOrderStatus({ order, payment });
    return NextResponse.json({ errorCode: 0 });
  } catch (error) {
    console.error("Eroare la procesarea notificării:", error);
    return NextResponse.json(
      { errorCode: 1, message: error.message },
      { status: 400 }
    );
  }
}
