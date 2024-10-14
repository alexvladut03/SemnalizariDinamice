import { createContext, useContext, useEffect, useState } from "react";
import { getAllProductsByIds } from "../functions/product/get-all-products-by-ids";
import { removeFromCart } from "../actions/cart/remove-from-cart";
import { getCart } from "../actions/cart/get-cart";
import { updateCart } from "../actions/cart/update-cart";

const CartContext = createContext({
  items: [],
  addToCart() {},
  removeFromCart() {},
  countCartItems() {},
  countTotalPrice() {},
});

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (product, qty) => {
    const updatedCart = await updateCart(product, qty);
    await fetchAndUpdateCart(updatedCart);
  };

  const removeItemFromCart = async (productId) => {
    const updatedCart = await removeFromCart(productId);
    await fetchAndUpdateCart(updatedCart);
  };

  const countCartItems = () => {
    return cartItems.reduce((acc, item) => acc + item.count, 0);
  };

  const countTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.count * item.price, 0);
  };

  const fetchAndUpdateCart = async (cart) => {
    if (cart.length > 0) {
      const ids = cart.map((item) => item.id);
      const products = await getAllProductsByIds(ids);

      const countMap = new Map();
      cart.forEach((cartItem) => {
        countMap.set(cartItem.id, cartItem.count);
      });

      const fetchedCartItems = products.map((product) => ({
        ...product,
        count: countMap.get(product.id),
      }));

      setCartItems(fetchedCartItems);
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getCart();
      await fetchAndUpdateCart(cart);
    };

    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addToCart,
        removeFromCart: removeItemFromCart,
        countCartItems,
        countTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
