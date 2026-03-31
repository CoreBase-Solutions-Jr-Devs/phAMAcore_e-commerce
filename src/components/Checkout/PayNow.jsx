import React from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../../hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  InitiatePaymentMutationFn,
  postConfirmMpesaPaymentMutationFn,
} from "../../lib/api";
import { selectCardInfo } from "../../features/checkoutSlice";
import {
  selectCheckoutResponse,
  selectCheckoutPayload,
  selectCheckoutItems,
} from "../../features/checkoutSlice";
import MpesaIcon from "../../assets/images/logo/Mpesa-Logo.png"; 
const PayNow = ({ closePayNow }) => {
  const { type, last4, name } = useSelector(selectCardInfo);
  const checkoutResponse = useSelector(selectCheckoutResponse);
  const { cart } = useSelector((state) => state.itemCart);
  const items = useSelector(selectCheckoutItems);
  const checkoutPayload = useSelector(selectCheckoutPayload);
  const navigate = useNavigate();
  const maskPhoneNumber = (phone) => {
    if (!phone) return "N/A";
    const last4 = phone.slice(-4);
    return `XXXX-${last4}`;
  };

  const paymentMethodMap = {
    1: "M-PESA",
    2: "Card",
    3: "Paybill",
    4: "Cash on Delivery",
  };

  const email = checkoutPayload?.shippingAddress?.emailAddress;
  // const phone = checkoutPayload?.shippingAddress?.phoneNumber;
  // const paymentMethod = checkoutPayload?.payment?.method;
  const date = checkoutResponse?.createdAt;
  const selectedMethod =
    paymentMethodMap[checkoutPayload?.payment?.method] || "N/A";

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount);

  const total = formatCurrency(checkoutResponse.totalAmount || 0);

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-KE")
    : "N/A";
  // --- Initiate Payment Mutation ---
  const { mutate: initiatePayment, isLoading: isInitiating } = useMutation({
    mutationFn: () => InitiatePaymentMutationFn(checkoutResponse.orderId),
    onSuccess: (data) => {
      toast({
        title: "Payment Initiated ✅",
        description: "You can now confirm your M-PESA payment.",
        variant: "success",
      });
 setTimeout(() => {
      navigate("/confirm");
      }, 5000);
    },
    onError: (err) => {
      toast({
        title: "Payment Initiation Failed",
        description: err?.message || "Unable to initiate payment.",
        variant: "destructive",
      });
    },
  });

  const handleInitiatePayment = () => initiatePayment();

  // // If checkout data not ready
  // if (!checkoutResponse?.isSuccess) {
  //   return <p className="text-center mt-5">Loading checkout data...</p>;
  // }

  return (
    <section className="checkout py-40">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="text-center">
              <h3>Order Received.</h3>
            </div>

            <p className="text-dark ">
              Thank you. Your Order has been received.
            </p>

            {/* ===== SUMMARY CARD ===== */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="row text-center text-sm">
                  {/* Row 1: Order Number + Date + Payment Method */}
                  <div className="col-12 col-sm-4 mb-3 d-flex flex-column align-items-start border-end pe-3">
                    <p className="mb-1">Order Number:</p>
                    {/* <span className="fw-semibold">{checkoutResponse?.checkoutId || "—"}</span> */}
                  </div>

                  <div className="col-12 col-sm-4 mb-3 d-flex flex-column align-items-start border-end pe-3">
                    <p className="mb-1 text-sm">Date:</p>
                    <span className="fw-semibold text-sm">{formattedDate}</span>
                  </div>

                  <div className="col-12 col-sm-4 mb-3 d-flex flex-column align-items-start border-end pe-3">
                    <p className="mb-1">Payment Method:</p>
                    <span className="fw-semibold">{selectedMethod}</span>
                  </div>

                  {/* Row 2: Email + Total */}
                  <div className="col-12 col-sm-4 mb-3 d-flex flex-column align-items-start border-end pe-3">
                    <p className="mb-1 text-sm">Email:</p>
                    <span className="fw-semibold text-sm">{email || "—"}</span>
                  </div>

                  <div className="col-12 col-sm-4 mb-3 d-flex flex-column align-items-start border-end pe-3">
                    <p className="mb-1 text-sm">Total:</p>
                    <span className="fw-semibold text-sm">
                      {new Intl.NumberFormat("en-KE", {
                        style: "currency",
                        currency: "KES",
                      }).format(checkoutResponse?.totalAmount || 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-details my-4">
              <h3>Order Details</h3>

              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between fw-semibold text-sm">
                  <span>Product</span>
                  <span>Total</span>
                </li>

                {items?.map((item) => (
                  <li
                    key={item.productId}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span className="text-sm ">
                      {item.productName} <em>(x {item.quantity})</em>
                    </span>
                    <span className="text-sm fw-semibold">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </span>
                  </li>
                ))}

                <li className="list-group-item d-flex justify-content-between">
                  <span className="text-sm ">Subtotal:</span>
                  <span className="text-sm fw-semibold">
                    {formatCurrency(checkoutResponse?.subTotal)}
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <span className="text-sm ">Delivery fee:</span>
                  <span className="text-sm fw-semibold">
                    {formatCurrency(checkoutResponse?.deliveryFee)}
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <span className="text-sm ">Total:</span>
                  <span className="text-sm fw-semibold">
                    {formatCurrency(checkoutResponse?.totalAmount)}
                  </span>
                </li>
              </ul>

              {/* ===== PAYMENT BUTTON ===== */}
       <div className="d-flex justify-content-center mt-4">
  <button
    type="button"
    className="btn btn-sm btn-main mt-4 py-3 w-25 rounded-3 d-flex align-items-center justify-content-between"
    disabled={isInitiating}
    onClick={handleInitiatePayment}
  >
    {isInitiating && (
      <div className="spinner-border spinner-border-sm me-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )}

    {/* Centered Text */}
    <span className="mx-auto">Pay Now</span>

    {/* Image on the right */}
    {selectedMethod === "M-PESA" && (
      <img src={MpesaIcon} alt="mpesa" width={40} />
    )}
  </button>
</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayNow;
