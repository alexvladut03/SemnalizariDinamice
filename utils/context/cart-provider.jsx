import { createContext, useContext, useEffect, useState } from "react";
import { getAllProductsByIds } from "../functions/product/get-all-products-by-ids";
import { removeFromCart as serverRemoveFromCart } from "../actions/cart/remove-from-cart";
import { getCart } from "../actions/cart/get-cart";
import { updateCart as serverUpdateCart } from "../actions/cart/update-cart";
import { debounce } from "../debounce";

const CartContext = createContext({
  items: [],
  addToCart() {},
  removeFromCart() {},
  countCartItems() {},
  countTotalPrice() {},
  loading: false,
});

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Debounced update function for adding to the cart
  const debouncedUpdateCart = debounce(async (product, qty) => {
    const updatedCart = await serverUpdateCart(product, qty);
    await fetchAndUpdateCart(updatedCart);
  }, 500); // Adjust delay as needed

  // Debounced remove function for removing from the cart
  const debouncedRemoveFromCart = debounce(async (productId) => {
    const updatedCart = await serverRemoveFromCart(productId);
    await fetchAndUpdateCart(updatedCart);
  }, 500); // Adjust delay as needed

  const addToCart = (product, qty) => {
    setLoading(true);
    debouncedUpdateCart(product, qty);
    setLoading(false);
  };

  const removeItemFromCart = (productId) => {
    setLoading(true);
    debouncedRemoveFromCart(productId);
    setLoading(false);
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
      setLoading(true);
      const cart = await getCart();
      await fetchAndUpdateCart(cart);
      setLoading(false);
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
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
