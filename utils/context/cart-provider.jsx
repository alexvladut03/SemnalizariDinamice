import { createContext, useContext, useEffect, useState } from "react";
import { getAllProductsByIds } from "../functions/product/get-all-products-by-ids";
import { removeFromCart as serverRemoveFromCart } from "../actions/cart/remove-from-cart";
import { getCart } from "../actions/cart/get-cart";
import { updateCart as serverUpdateCart } from "../actions/cart/update-cart";

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
  const [pendingQuantities, setPendingQuantities] = useState({}); // To track pending quantities
  const [timeoutId, setTimeoutId] = useState(null); // To manage the timeout

  const addToCart = (product, qty) => {
    // Cancel the previous timeout if it exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Immediately update the cart items
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);
      let updatedItems;

      if (existingItem) {
        const newCount = existingItem.count + qty;

        // Check if the new count is less than or equal to 0
        if (newCount <= 0) {
          // Remove item from cart
          updatedItems = prevCartItems.filter((item) => item.id !== product.id);
        } else {
          // Update the count for the existing item
          updatedItems = prevCartItems.map((item) =>
            item.id === product.id ? { ...item, count: newCount } : item
          );
        }
      } else if (qty > 0) {
        // If the item doesn't exist and qty is positive, add it to the cart
        updatedItems = [
          ...prevCartItems,
          {
            createdAt: product.createdAt,
            id: product.id,
            mainImage: product.images.find((img) => img.isMain)?.image,
            name: product.name,
            length: product.length,
            width: product.width,
            category: product.category.name,
            sku: product.sku,
            height: product.height,
            weight: product.weight,
            price: product.price,
            count: qty,
          },
        ];
      } else {
        // If the item doesn't exist and qty is 0 or negative, do nothing
        updatedItems = prevCartItems;
      }

      return updatedItems;
    });

    // Update pending quantities for server sync
    setPendingQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + qty,
    }));

    // Set a timeout to call the server after a delay (e.g., 300 ms)
    const id = setTimeout(async () => {
      // Use the latest state from the pending quantities directly
      const totalQuantity = (pendingQuantities[product.id] || 0) + qty;

      // Call the server with the total quantity
      await serverUpdateCart(product, totalQuantity);

      // Reset the pending quantities after the update
      setPendingQuantities((prev) => ({ ...prev, [product.id]: 0 }));

      // Re-fetch the cart after the update
      const updatedCart = await getCart();
      await fetchAndUpdateCart(updatedCart);
    }, 300);

    setTimeoutId(id);
  };

  const removeItemFromCart = (productId) => {
    // Optimistically remove the item
    const updatedItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedItems);

    // Cancel the previous timeout if it exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a timeout to call the server after a delay (e.g., 300 ms)
    const id = setTimeout(async () => {
      await serverRemoveFromCart(productId);
      // Re-fetch the cart after the removal if needed
      await fetchAndUpdateCart(await getCart());
    }, 300);

    setTimeoutId(id);
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
      const fetchedProducts = await getAllProductsByIds(ids);

      fetchedProducts.map((product) => {
        product.mainImage = product.images.find((img) => img.isMain)?.image;
      });

      const products = fetchedProducts.map((product) => {
        const {
          id,
          name,
          price,
          mainImage,
          length,
          weight,
          height,
          category,
          sku,
          width,
        } = product;
        return {
          id,
          name,
          price,
          mainImage,
          length,
          weight,
          height,
          category: category.name,
          sku,
          width,
        };
      });

      const countMap = new Map();
      cart.forEach((cartItem) => {
        countMap.set(cartItem.id, cartItem.count);
      });

      const fetchedCartItems = products.map((product) => ({
        ...product,
        count: countMap.get(product.id) || 0,
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
