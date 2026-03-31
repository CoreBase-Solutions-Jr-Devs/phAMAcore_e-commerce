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
    <section className="cart py-40">
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

            {/* TABLE */}
            <div className="col-xl-9 col-lg-8">
              <div className="cart-table border border-gray-100 rounded-8 px-40 py-30">
                <div className="overflow-x-auto scroll-sm scroll-sm-horizontal">

                  <table className="table style-three">
                    <thead>
                      <tr>
                        <th className="h6 fw-bold">Delete</th>
                        <th className="h6 fw-bold">Product Name</th>
                        <th className="h6 fw-bold">Price</th>
                        <th className="h6 fw-bold">Quantity</th>
                       
                      </tr>
                    </thead>

                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>

                          {/* DELETE */}
                          <td>
                            <button
                              className="remove-tr-btn flex-align gap-12 hover-text-danger-600"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <i className="ph ph-x-circle text-lg d-flex" />
                              Remove
                            </button>
                          </td>

                          {/* PRODUCT */}
                          <td>
                            <div className="table-product d-flex align-items-center gap-24">

                              <span
                                className="table-product__thumb border border-gray-100 rounded-8 flex-center"
                                onClick={() => navigate(`/products/product-details/${item.id}`)}
                                style={{ cursor: "pointer" }}
                              >
                                <img src={item.imageUrl} alt={item.name}     className="img-fluid " />
                              </span>

                              <div className="table-product__content text-start">
                                <h6 className="title text-md fw-semibold mb-8">
                                  <Link className="link text-line-2">
                                    {item.name}
                                  </Link>
                                </h6>

                                
                                <span className="py-2 px-8 text-sm rounded-pill text-main-600 bg-main-50">
                                  {item.categoryName}
                                </span>
                                 <div className="flex-align gap-16 mb-16 py-2">
                                <div className="flex-align gap-6">
                                  <span className="text-sm text-warning-600 d-flex">
                                    <i className="ph-fill ph-star" />
                                  </span>
                                  <span className="text-sm fw-medium text-gray-900">
                                    4.8
                                  </span>
                                </div>
                                <span className="text-sm text-gray-200">|</span>
                                <span className="text-neutral-600 text-sm">
                                  128 Reviews
                                </span>
                              </div>
                              </div>

                            </div>
                          </td>

                          {/* PRICE */}
                          <td>
                            <span className="text-sm fw-semibold">
                              {numberFormatter.format(item.price)}
                            </span>
                          </td>

                          {/* QUANTITY */}
                          <td>
                            <QuantityControl currentItem={item} />
                          </td>

                          {/* SUBTOTAL */}
                          {/* <td>
                            <span className="text-lg fw-semibold">
                              {numberFormatter.format(item.price * item.quantity)}
                            </span>
                          </td> */}

                        </tr>
                      ))}
                    </tbody>
                  </table>

                </div>

                {/* COUPON + UPDATE */}
                {/* <div className="flex-between flex-wrap gap-16 mt-16">
                  <div className="flex-align gap-16">
                    <input
                      type="text"
                      className="common-input"
                      placeholder="Coupon Code"
                    />
                    <button className="btn btn-main py-18">
                      Apply Coupon
                    </button>
                  </div>

                  <button className="text-lg text-gray-500 hover-text-main-600">
                    Update Cart
                  </button>
                </div> */}

              </div>
            </div>

            {/* SIDEBAR */}
            <div className="col-xl-3 col-lg-4">
              <div className="cart-sidebar border border-gray-100 rounded-8 px-24 py-40">

                <h6 className="text-xl mb-32">Cart Totals</h6>

                <div className="bg-color-three rounded-8 p-24">
                  <div className="mb-32 flex-between text-dark">
                    <span>Subtotal</span>
                    <span className="fw-semibold">
                      {numberFormatter.format(total)}
                    </span>
                  </div>

                  <div className="mb-32 flex-between text-dark">
                    <span>Estimated Delivery</span>
                    <span className="fw-semibold">Free</span>
                  </div>

                  <div className="flex-between text-dark">
                    <span>Estimated Tax</span>
                    <span className="fw-semibold">KES 0.00</span>
                  </div>
                </div>

                <div className="bg-color-three rounded-8 p-24 mt-24 ">
                  <div className="flex-between text-dark">
                    <span className="text-xl fw-semibold">Total</span>
                    <span className="text-xl fw-semibold">
                      {numberFormatter.format(total)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="btn btn-main mt-40 py-18 w-100 rounded-8"
                >
                  Proceed to Checkout
                </button>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default CartSection;