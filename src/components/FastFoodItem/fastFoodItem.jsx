import React from "react";
import "./fastFoodItem.css";
import { HiShoppingCart } from "react-icons/hi";
import { getProductContext } from "../../context/CartContext";

function FastFoodItem({ name, price, ingredients, imageUrl, delay, id }) {
  const cart = getProductContext();
  const quantity = cart.getProductQuantity(id);
  return (
    <div
      className="card product-card h-100 border-0 shadow-sm pb-1 fade-in-horiz"
      style={{ animationDelay: delay + "s" }}
    >
      <span className="badge badge-end badge-shadow bg-success fs-md fw-medium ">
        قیمت :{price.toLocaleString()} تومان
      </span>
      <div className="card__placeholder">
        <img src={imageUrl} className="card-img-top" />
      </div>
      <div className="card-body text-center pt-3 pb-4 d-flex flex-column">
        <h5 className="mb-2">{name}</h5>
        <div className="fs-ms fw-bold text-muted mb-3">{ingredients}</div>
        {quantity === 0 && (
          <button
            className="btn btn-outline-success btn-sm w-100 mt-auto fw-bold"
            onClick={() => cart.addItemToCart(id)}
          >
            <HiShoppingCart className="fs-5 ms-3" />
            افزودن به سبد خرید
          </button>
        )}
        {quantity > 0 && (
          <div className="">
            <button
              className="btn btn-outline-success  fw-bolder"
              onClick={() => cart.addItemToCart(id)}
            >
              +
            </button>

            <button
              className="btn btn-outline-danger me-2  fw-bolder"
              onClick={() => cart.removeItemFromCart(id)}
            >
              -
            </button>
            <span className=" bg-white text-dark mx-2 px-3 rounded-1 fw-bolder">
              مجموع: {quantity}
            </span>
            <div className="mt-4">
              <button
                className="btn btn btn-danger text-white w-100"
                onClick={() => {
                  cart.deleteFromCart(id);
                }}
              >
                حذف{" "}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FastFoodItem;
