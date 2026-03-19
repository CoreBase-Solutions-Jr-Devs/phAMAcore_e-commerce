import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "../hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { CheckoutBasketMutationFn } from "../lib/api";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("payment1");
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);

  const emptyAddress = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    addressLine: "",
    county: "",
    city: "",
    postalCode: "",
    landmark: "",
    country: "",
  };

  const [formData, setFormData] = useState({
    shippingAddress: { ...emptyAddress },
    billingAddress: { ...emptyAddress },
    payment: { method: "", phoneNumber: "" },
    notes: "",
  });

  const paymentEnumMap = {
    payment1: 1, // Mpesa
    payment2: 2, // Card
    payment3: 3, // Paybill
    payment4: 4, // CashOnDelivery
  };

  const { mutate: CheckoutBasket, isLoading } = useMutation({
    mutationFn: CheckoutBasketMutationFn,
    onSuccess: () => {
      toast({
        title: "Payment Confirmed ✅",
        description: "Your order has been processed successfully.",
        variant: "success",
      });
    },
    onError: (err) => {
      toast({
        title: "Confirmation Failed",
        description: err?.message || "Unable to process your order.",
        variant: "destructive",
      });
    },
  });

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.id);
    setFormData({
      ...formData,
      payment: { ...formData.payment, method: paymentEnumMap[event.target.id] },
    });
  };

  const handlePlaceOrder = () => {
    const { shippingAddress } = formData;
    if (!shippingAddress.firstName || !shippingAddress.lastName || !shippingAddress.phoneNumber) {
      toast({
        title: "Missing Info",
        description: "Please fill all required shipping fields.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      basketCheckout: {
        userName: "essydev",
        customerId: "8e350c10-eec2-45d9-bc88-54c386f64bda",
        shippingAddress: formData.shippingAddress,
        billingAddress: useDifferentBilling
          ? formData.billingAddress
          : formData.shippingAddress,
        payment: formData.payment,
        notes: formData.notes,
      },
    };

    CheckoutBasket(payload);
  };

  return (
    <section className="checkout py-80">
      <div className="container container-lg">
        <div className="border border-gray-100 rounded-8 px-30 py-20 mb-40">
          <span>
            Have a coupon?{" "}
            <Link
              to="/cart"
              className="fw-semibold text-gray-900 hover-text-decoration-underline hover-text-main-600"
            >
              Click here to enter your code
            </Link>
          </span>
        </div>

        <div className="row">
          <div className="col-xl-9 col-lg-8">
            {/* Shipping Form */}
            <form className="pe-xl-5">
              <div className="row gy-3">
                {/* Map through shipping fields */}
                {Object.keys(emptyAddress).map((field) => (
                  <div key={field} className="col-12 col-sm-6">
                    <input
                      type={field === "phoneNumber" ? "number" : "text"}
                      className="common-input border-gray-100"
                      placeholder={field}
                      value={formData.shippingAddress[field]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingAddress: {
                            ...formData.shippingAddress,
                            [field]: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                ))}

                {/* Additional Notes */}
                <div className="col-12">
                  <div className="my-40">
                    <h6 className="text-lg mb-24">Additional Information</h6>
                    <input
                      type="text"
                      className="common-input border-gray-100"
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      value={formData.notes || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </form>

            {/* Billing Address Checkbox */}
            <div className="form-check mt-24">
              <input
                className="form-check-input"
                type="checkbox"
                checked={useDifferentBilling}
                onChange={(e) => setUseDifferentBilling(e.target.checked)}
                id="differentBilling"
              />
              <label className="form-check-label" htmlFor="differentBilling">
                Use different billing address
              </label>
            </div>

            {/* Billing Address Form */}
            {useDifferentBilling && (
              <div className="mt-40">
                <h4>Billing Address</h4>
                <div className="row gy-3">
                  {Object.keys(emptyAddress).map((field) => (
                    <div key={field} className="col-12 col-sm-6">
                      <input
                        type={field === "phoneNumber" ? "number" : "text"}
                        className="common-input border-gray-100"
                        placeholder={field}
                        value={formData.billingAddress[field]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            billingAddress: {
                              ...formData.billingAddress,
                              [field]: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Order Summary & Payment */}
          <div className="col-xl-3 col-lg-4">
            <div className="checkout-sidebar">
              <div className="bg-color-three rounded-8 p-24 text-center">
                <span className="text-gray-900 text-xl fw-semibold">Your Orders</span>
              </div>
              <div className="border border-gray-100 rounded-8 px-24 py-40 mt-24">
                <div className="mb-32 pb-32 border-bottom border-gray-100 flex-between gap-8">
                  <span className="text-gray-900 fw-medium text-xl font-heading-two">Product</span>
                  <span className="text-gray-900 fw-medium text-xl font-heading-two">Subtotal</span>
                </div>
                <div className="flex-between gap-24 mb-32">
                  <div className="flex-align gap-12">
                    <span className="text-gray-900 fw-normal text-md font-heading-two w-144">
                      HP Chromebook With Intel Celeron
                    </span>
                    <span className="text-gray-900 fw-normal text-md font-heading-two">
                      <i className="ph-bold ph-x" />
                    </span>
                    <span className="text-gray-900 fw-semibold text-md font-heading-two">1</span>
                  </div>
                  <span className="text-gray-900 fw-bold text-md font-heading-two">$250.00</span>
                </div>

                <div className="border-top border-gray-100 pt-30 mt-30">
                  <div className="mb-32 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two text-xl fw-semibold">Subtotal</span>
                    <span className="text-gray-900 font-heading-two text-md fw-bold">$859.00</span>
                  </div>
                  <div className="mb-0 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two text-xl fw-semibold">Total</span>
                    <span className="text-gray-900 font-heading-two text-md fw-bold">$859.00</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-32">
                <h3 className="fw-semibold mb-24">Payment Method</h3>
                {["payment1", "payment2", "payment3", "payment4"].map((method) => (
                  <div className="payment-item" key={method}>
                    <div className="form-check common-check common-radio py-16 mb-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        id={method}
                        checked={selectedPayment === method}
                        onChange={handlePaymentChange}
                      />
                      <label className="form-check-label fw-semibold text-neutral-600" htmlFor={method}>
                        {method === "payment1"
                          ? "M-PESA"
                          : method === "payment2"
                          ? "Card Payment"
                          : method === "payment3"
                          ? "Paybill"
                          : "Cash On Delivery"}
                      </label>
                    </div>

                    {/* Payment Content */}
                    {selectedPayment === method && (
                      <div className="payment-item__content px-16 py-24 rounded-8 bg-main-50 position-relative d-block mt-16">
                        {method === "payment1" && (
                          <>
                            <label className="mb-8 fw-medium">Phone Number</label>
                            <input
                              type="text"
                              className="common-input"
                              placeholder="2547XXXXXXXX"
                              value={formData.payment.phoneNumber}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  payment: { ...formData.payment, phoneNumber: e.target.value },
                                })
                              }
                            />
                          </>
                        )}
                        {method === "payment2" && (
                          <>
                            {/* Card Fields */}
                            <div className="mb-16">
                              <label className="mb-8 fw-medium">Card Number</label>
                              <input type="text" className="form-control" placeholder="1234 5678 1234 5678" />
                            </div>
                          </>
                        )}
                        {method === "payment3" && <p>Use Paybill Number: 123456, Account: Order ID</p>}
                        {method === "payment4" && <p>Pay with cash upon delivery.</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-32 pt-32 border-top border-gray-100">
                <p className="text-gray-500">
                  Your personal data will be used to process your order, support your experience throughout this website,
                  and for other purposes described in our{" "}
                  <Link to="#" className="text-main-600 text-decoration-underline">
                    privacy policy
                  </Link>
                  .
                </p>
              </div>

              <button
                className="btn btn-main mt-40 py-18 w-100 rounded-8"
                onClick={(e) => {
                  e.preventDefault();
                  handlePlaceOrder();
                }}
              >
                {isLoading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;