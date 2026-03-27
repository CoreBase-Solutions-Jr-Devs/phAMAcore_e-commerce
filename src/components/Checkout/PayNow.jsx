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
import { selectCheckoutResponse, selectCheckoutPayload } from "../../features/checkoutSlice";
import MpesaIcon from "../../assets/images/logo/Mpesa-Logo.png"; // path to your icon
const PayNow = ({ closePayNow }) => {
  // Get checkout data from Redux
  const { type, last4, name } = useSelector(selectCardInfo);
const checkoutResponse = useSelector(selectCheckoutResponse);
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
      
        navigate("/confirm");
   
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
 <div
  className="container my-5"
  style={{ maxWidth: "800px", width: "100%" }} 
>
  <h2 className="text-center mb-3 fw-bold">Order received</h2>
  <p className="text-center text-muted mb-4">
    Thank you. Your order has been received.
  </p>
  <h6 className="mb-3 fw-semibold ">Order Summary</h6>
<div
  className="border rounded p-3 mb-4"
  style={{ borderColor: "#663300", fontSize: "14px" }}
>


  <div className="row text-center text-lg-start mb-3">
      <div className="col">
      <small className="text-muted d-block">Order Number</small>
      <span className="fw-semibold"></span>
    </div>
    <div className="col">
      <small className="text-muted d-block">DATE</small>
      <span className="fw-semibold">{formattedDate}</span>
    </div>
    <div className="col">
      <small className="text-muted d-block">EMAIL</small>
      <span className="fw-semibold">{email}</span>
    </div>
    <div className="col">
      <small className="text-muted d-block">PAYMENT METHOD</small>
      <span className="fw-semibold">{selectedMethod}</span>
    </div>
  </div>

 
  <div className="row text-center text-lg-start">
    <div className="col">
      <small className="text-muted d-block">SUBTOTAL</small>
      <span className="fw-semibold">{formatCurrency(checkoutResponse.subTotal)}</span>
    </div>
    <div className="col">
      <small className="text-muted d-block">DELIVERY FEE</small>
      <span className="fw-semibold">{formatCurrency(checkoutResponse.deliveryFee)}</span>
    </div>
    <div className="col">
      <small className="text-muted d-block">VAT</small>
      <span className="fw-semibold">{formatCurrency(checkoutResponse.vatAmount)}</span>
    </div>
    <div className="col">
      <small className="text-muted d-block">TOTAL</small>
      <span className="fw-bold">{formatCurrency(checkoutResponse.totalAmount)}</span>
    </div>
  </div>
</div>
  <h6 className="mb-3 fw-semibold "> Payment Method</h6>

  <div className="d-flex flex-column align-items-center text-center">
    <div className="border rounded p-3 mb-4 d-flex justify-content-between align-items-center w-100">
      <div className="d-flex align-items-center gap-2">
        <input type="radio" checked readOnly />
        <span className="fw-medium">{selectedMethod || "N/A"}</span>

        {selectedMethod === "M-PESA" &&
          checkoutPayload?.payment?.phoneNumber && (
            <small className="fw-medium ms-2">
              {maskPhoneNumber(checkoutPayload.payment.phoneNumber)}
            </small>
          )}
      </div>

      <div>
        {selectedMethod === "M-PESA" ? (
          <img src={MpesaIcon} alt="M-PESA" className="w-40" />
        ) : (
          <small className="text-success fw-bold">
            {selectedMethod || "N/A"}
          </small>
        )}
      </div>
    </div>

    <div className="d-flex gap-2 w-100">
      <button
        className="btn btn-main-two flex-grow-1 py-3 fw-semibold"
        onClick={handleInitiatePayment}
        nav
        disabled={isInitiating}
      >
        {isInitiating
          ? "Initiating Payment..."
          : `Initiate Payment: ${total}`}
      </button>
    </div>
  </div>
</div>
  );
};

export default PayNow;
