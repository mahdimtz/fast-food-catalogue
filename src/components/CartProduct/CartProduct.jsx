import React from "react";
import { getProductContext } from "../../context/CartContext";

function CartProduct({ id, quantity }) {
  const cart = getProductContext();
  const productData = cart.getProductData(id);
  console.log(productData);
  return (
    <>
      <p>{productData.name}</p>
      <p>تعداد: {quantity}</p>
      <p>قیمت: {quantity * productData.price}</p>
      <button
        className="btn btn-outline-secondary mb-5 text-white"
        onClick={() => cart.deleteFromCart(id)}
      >
        حذف
      </button>
    </>
  );
}

export default CartProduct;
