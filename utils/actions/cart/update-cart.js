"use server";
import { cookies } from "next/headers";

export const updateCart = async (product, qty) => {
  const cookieStore = cookies();
  const cartCookie = cookieStore.get("cart");
  let cart = cartCookie ? JSON.parse(cartCookie.value) : [];

  const index = cart.findIndex((item) => item.id === product.id);

  if (index === -1 && qty > 0) {
    cart.push({
      id: product.id,
      count: qty,
    });
  } else if (index !== -1) {
    cart[index].count += qty;
    if (cart[index].count <= 0) {
      cart.splice(index, 1);
    }
  }

  // Store only the id and count in the cookie
  cookies().set({
    name: "cart",
    value: JSON.stringify(cart),
    httpOnly: true,
    path: "/",
  });

  return cart;
};
