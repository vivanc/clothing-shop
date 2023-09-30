import { createContext, useState, useEffect } from "react";

// Helper function to know if to add quantity or create new cart item

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if found, increment quantity
  // return new array
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // return new array (moved up)
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// to create toggle effect

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  addItemToCart: () => {},
  cartCount: 0,
});

// addItemtoCart in the CartContext is to define how to add and create/set new cartItems arrary, then will be used in setCartItems */
// wny in the course setCartItems are not defined in the createContext??

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // use useEffect to calculate cartCount because we only want recalculation whenever the cartItems array changes
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => (total += cartItem.quantity),
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  // This addItemToCard is triggered when user click Add Item To Cart on Shop page */
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
