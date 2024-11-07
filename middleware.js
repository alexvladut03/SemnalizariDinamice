import { auth } from "./auth";
import { NextResponse } from "next/server";

// Combinăm logica de autentificare cu cea pentru Netopia
export default async function middleware(request) {
  // Mai întâi verificăm dacă este ruta de notificare Netopia
  if (request.nextUrl.pathname === "/api/payment/notify") {
    return NextResponse.next({
      headers: {
        "Access-Control-Allow-Origin": "https://secure.netopia-payments.com",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // Apoi aplicăm logica de autentificare existentă
  const authResult = await auth(request);
  if (!authResult.auth && request.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", request.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  return NextResponse.next();
}

// Actualizăm matcher-ul pentru a include și ruta Netopia
export const config = {
  matcher: ["/admin/:path*", "/api/payment/notify"],
};
