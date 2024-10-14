"use server";
import { cookies } from "next/headers";

export const removeFromCart = async (productId) => {
  const cookieStore = cookies();
  const cartCookie = cookieStore.get("cart");
  let cart = cartCookie ? JSON.parse(cartCookie.value) : [];

  cart = cart.filter((item) => item.id !== productId);

  // Update the cookie after removing the item
  cookies().set({
    name: "cart",
    value: JSON.stringify(cart),
    httpOnly: true,
    path: "/",
  });

  return cart;
};
