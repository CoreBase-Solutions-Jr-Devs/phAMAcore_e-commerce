import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuantityControl from "../helper/QuantityControl";
import { useSelector, useDispatch } from "react-redux";
import { deleteItemFromCart } from "../features/cartSlice";
// import { numberFormatter } from "../helper/helpers";import useAuth from "../hooks/api/use-auth";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
// import {  GetCartQueryFn, RemoveItemBasketMutationFn   } from "../lib/api";
// import { fetchLocation } from "../features/locationSlice";
import { selectIsAuthenticated, selectCustomerId } from "../features/authSlice";
import { toast } from "../hooks/use-toast";
  import loader  from "../assets/images/illustration/19.svg";
const CartSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { cart } = useSelector((state) => state.itemCart);

  const queryClient = useQueryClient();
    const customerId = useSelector(selectCustomerId);

  // const { cart } = useSelector((state) => state.itemCart);
//     const { latitude, longitude } = useSelector((state) => state.location);
// const [showBrowserLocation, setShowBrowserLocation] = useState(false);
// const [showSavedLocation, setShowSavedLocation] = useState(false);
  const numberFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
});

  const handleRemoveItem = (itemId) => {
    dispatch(deleteItemFromCart(itemId));
  };

// Subtotal calculation
const subTotal = cart.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);

  const total = subTotal;


  const handleCheckout = () => {
      navigate("/checkout");
  };

  return (
    <section className="cart py-80">
      <div className="container container-lg">

        {!cart.length && (
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: "50vh" }}>
  <img
    src={loader}
    width={300}
    alt="Logo"
    className="img-fluid mb-16"
  />
  <h6 className="mb-16">Your Cart is empty</h6>
  <Link
    to="/"
    className="link text-line-2 bg-main-50 hover-bg-main-100 transition-2 text-black rounded-5 py-10 px-20 d-inline-flex align-items-center gap-8"
    tabIndex={0}
  >
    <i className="ph ph-shopping-cart" /> Shop today's deals
  </Link>
</div>
        )}

        {cart.length > 0 && (
          <div className="row gy-4">
            <div className="col-xl-9 col-lg-8">
              <div className="cart-table border border-gray-100 rounded-8 px-20 py-28">
                <div className="overflow-x-auto">
                  <table className="table style-three">
                    <thead>
                      <tr>
                        <th>Delete</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                     
                      </tr>
                    </thead>

                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                         
                          <td>
                            <button
                              className="remove-tr-btn flex-align gap-4 hover-text-danger-600"
                        onClick={() => handleRemoveItem(item.id)}
                            >
                              <i className="ph ph-x-circle text-base" />
                              Remove
                            </button>
                          </td>

 <td>
  <div className="table-product d-flex align-items-center" style={{ gap: "8px" }}>
    <span
      className="table-product__thumb border rounded-8 flex-center"
      onClick={() => navigate(`/products/product-details/${item.id}`)}
      style={{ cursor: "pointer", width: "50px", height: "50px", flexShrink: 0 }}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="img-fluid"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </span>

    <div className="table-product__content text-start" style={{ flex: 1, minWidth: 0 }}>
      {/* Product Name */}
      <h6 className="title text-sm fw-semibold mb-1" style={{ lineHeight: "1.2" }}>
        <Link className="text-truncate d-block" style={{ maxWidth: "350px" }}>
          {item.name}
        </Link>
      </h6>

      {/* Category */}
      <span className="text-xs text-gray-500 d-block mb-1" style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {item.categoryName}
      </span>
    </div>
  </div>
</td>

                          {/* PRICE */}
                          <td>
                            {numberFormatter.format(Number(item.price))}
                          </td>

                          {/* QUANTITY */}
                          <td>
                            <QuantityControl currentItem={item} />
                          </td>

                       
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
{/* SIDEBAR */}
<div className="col-xl-3 col-lg-4">
  <div className="cart-sidebar border rounded-8 p-24">
    <h5 className="fw-bold mb-24">Order Summary & Checkout</h5>
 

    {/* Order Summary */}
    <div className="bg-light p-16 rounded-8 mb-16">
      <div className="d-flex justify-content-between mb-8">
        <span>Subtotal </span>
        <span>{numberFormatter.format(total)}</span>
      </div>
      <div className="d-flex justify-content-between mb-8">
        <span>Amount</span>
        <span>{numberFormatter.format(total)}</span>
      </div>
    </div>

    {/* Checkout Button */}
    <div className="d-flex gap-12 mt-24">
      <button className="btn btn-main flex-grow-1" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  </div>
</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartSection;