import { createContext, useContext, useState } from "react";
import useAxios from "../hooks/useAxios";

const AppContext = createContext({});

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [products] = useAxios("/FastFood/list");

  function getProductData(id) {
    return products.find((item) => item.id === id);
  }

  function getProductQuantity(id) {
    const quantity = cartProducts.find((item) => item.id === id)?.quantity;
    if (!quantity) return 0;
    return quantity;
  }
  function addItemToCart(id) {
    const quantity = getProductQuantity(id);
    if (quantity === 0) {
      setCartProducts([...cartProducts, { id: id, quantity: 1 }]);
    } else {
      setCartProducts((cartProducts) =>
        cartProducts.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  }

  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((item) => item.id !== id)
    );
  }
  function removeItemFromCart(id) {
    const quantity = getProductQuantity(id);
    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts((cartProducts) =>
        cartProducts.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  }
  function getTotalAmount() {
    let totalAmount = 0;
    cartProducts.map((item) => {
      const productData = getProductData(item.id);
      console.log(productData);
      totalAmount += productData.price * item.quantity;
    });
    console.log(totalAmount);
    return totalAmount;
  }

  const ContextValue = {
    items: cartProducts,
    products,
    getProductQuantity,
    addItemToCart,
    deleteFromCart,
    removeItemFromCart,
    getProductData,
    getTotalAmount,
  };

  return (
    <AppContext.Provider value={ContextValue}>{children}</AppContext.Provider>
  );
}

export function getProductContext() {
  return useContext(AppContext);
}
