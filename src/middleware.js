import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  if (
    !req.cookies.has("next-auth.session-token") &&
    req.cookies.has("__Secure-next-auth.session-token")
  ) {
    console.log("Relaying auth cookie...");
    req.cookies.set({
      ...req.cookies.get("__Secure-next-auth.session-token"),
      name: "next-auth.session-token",
    });
  }

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  console.log(token);
  console.log(req);

  if (!token) {
    // Redirect to login page if the user is not authenticated
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
