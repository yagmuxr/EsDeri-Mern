import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(
        localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : []
      );
    const [couponDiscount, setCouponDiscount] = useState(0);

    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

  const addToCart = (cartItem) => {
    const existingItem = cartItems.find(
      (item) => item._id === cartItem._id
    );
    
    if (existingItem) {
      // Eğer ürün zaten sepette varsa miktarını artır
      const updatedCart = cartItems.map((item) =>
        item._id === cartItem._id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      setCartItems(updatedCart);
    } else {
      // Yeni ürünü quantity: 1 ile ekle
      setCartItems((prevCart) => [...prevCart, { ...cartItem, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        couponDiscount,
        setCouponDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

CartProvider.propTypes = {
  children: PropTypes.node,
};