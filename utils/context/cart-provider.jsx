import { createContext, useContext, useEffect, useState } from "react";
import { getProductsByIds } from "../actions/product/get-all-products";

const fetchCartItems = async (ids) => {
  const product = await getProductsByIds(ids);
  return product;
};

const CartContext = createContext({
  items: [],
  updateCart() {},
  removeFromCart() {},
  countCartItems() {},
  countTotalPrice() {},
});

const updateCartInLocalStorage = (cartItems) => {
  console.log("cartItems", cartItems);
  const cartItemsToStore = cartItems.map((item) => ({
    id: item.id,
    count: item.count,
  }));
  localStorage.setItem("cartItems", JSON.stringify(cartItemsToStore));
};

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const updateCart = (product, qty) => {
    const finalCartItems = [...cartItems];
    const index = cartItems.findIndex((item) => item.id === product.id);

    if (index === -1) {
      if (qty > 0) {
        finalCartItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.mainImage,
          count: qty,
        });
      }
    } else {
      finalCartItems[index].count += qty;
      if (finalCartItems[index].count <= 0) {
        finalCartItems.splice(index, 1);
      }
    }

    updateCartInLocalStorage(finalCartItems);
    setCartItems(finalCartItems);
  };

  const removeFromCart = (product) => {
    const newProducts = cartItems.filter((item) => item.id !== product.id);

    updateCartInLocalStorage(newProducts);
    setCartItems(newProducts);
  };

  const countCartItems = () => {
    return cartItems.reduce((acc, item) => acc + item.count, 0);
  };

  const countTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.count * item.price, 0);
  };

  useEffect(() => {
    const cartItemsFromLocalStorage = JSON.parse(
      localStorage.getItem("cartItems")
    );

    const fetchItems = async () => {
      if (cartItemsFromLocalStorage) {
        const ids = cartItemsFromLocalStorage.map((item) => item.id);

        const items = await fetchCartItems(ids);
        const countMap = new Map();

        // Aggregate counts for each id
        cartItemsFromLocalStorage.forEach((cartItem) => {
          if (countMap.has(cartItem.id)) {
            countMap.set(
              cartItem.id,
              countMap.get(cartItem.id) + cartItem.count
            );
          } else {
            countMap.set(cartItem.id, cartItem.count);
          }
        });

        const fetchedItemsFromLocalStorage = items.map((item) => ({
          ...item,
          count: countMap.get(item.id) || 0,
        }));

        console.log("fetched items", fetchedItemsFromLocalStorage);
        setCartItems(fetchedItemsFromLocalStorage);
      }
    };

    fetchItems();
  }, []);

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        updateCart,
        removeFromCart,
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
