"use server";
import { cookies } from "next/headers";

export const getCart = async () => {
  const cookieStore = cookies();
  const cartCookie = cookieStore.get("cart");
  const cart = cartCookie ? JSON.parse(cartCookie.value) : [];

  return cart;
};
