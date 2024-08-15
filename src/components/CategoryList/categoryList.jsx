import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Loading from "../Loading/loading";
import { getProductContext } from "../../context/CartContext";
import { Modal, ModalFooter, ModalHeader } from "react-bootstrap";
import CartProduct from "../CartProduct/CartProduct";

function CategoryList({ filterItems, children }) {
  const [categories, , loading] = useAxios({
    url: "/FoodCategory/categories",
  });
  const [showModal, setShowModal] = useState(false);

  const modalHandler = () => {
    setShowModal(!showModal);
  };
  const cart = getProductContext();
  const productCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="ps-3 w-100 d-flex align-items-center justify-content-between gap-5">
        <ul className="nav">
          <li className="nav-item" onClick={modalHandler}>
            <a href="#" className="nav-link">
              سبد خرید
            </a>
          </li>
          <li className="nav-item" onClick={() => filterItems()}>
            <a href="#" className="nav-link">
              همه ی فست فود ها
            </a>
          </li>
          {categories?.map((category) => (
            <li
              className="nav-item"
              key={category.id}
              onClick={() => filterItems(category.id)}
            >
              <a href="#" className="nav-link">
                {category.name}
              </a>
            </li>
          ))}
        </ul>
        {children}
      </div>
    );
  };
  return (
    <>
      <nav className="container mt-n5">
        <div
          className="d-flex align-items-center bg-white rounded-3 shadow-lg py-4"
          style={{ height: "80px" }}
        >
          {renderContent()}
        </div>
      </nav>
      <Modal
        contentClassName="card-bg"
        show={showModal}
        onHide={() => modalHandler()}
      >
        <ModalHeader>
          <h3 className="mb-4">سبد خرید</h3>
        </ModalHeader>
        <Modal.Body>
          {productCount > 0 ? (
            <>
              {cart.items.map((item) => (
                <CartProduct
                  key={item.id}
                  id={item.id}
                  quantity={item.quantity}
                />
              ))}
              <h6>مجموع قیمت :{cart.getTotalAmount()}</h6>
            </>
          ) : (
            <h3>سبد خرید خالی است</h3>
          )}
        </Modal.Body>
        <ModalFooter>
          <button onClick={modalHandler} className="btn btn-outline-danger">
            بستن
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CategoryList;
