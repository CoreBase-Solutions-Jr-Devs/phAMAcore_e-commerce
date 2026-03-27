import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../../hooks/use-toast";
import { postConfirmMpesaPaymentMutationFn } from "../../lib/api";
import { DotLoader } from "react-spinners";
const Confirm = ({ checkoutPayload, transactionId, closePayNow }) => {
  const [polling, setPolling] = useState(false);

 

  const { mutate: confirmPayment, isLoading } = useMutation({
    mutationFn: postConfirmMpesaPaymentMutationFn,
    onSuccess: (data) => {
      if (data?.status === "success") {
        toast({
          title: "Payment Confirmed ✅",
          description: "M-PESA payment has been confirmed successfully.",
          variant: "success",
        });
        setPolling(false);
        setTimeout(() => closePayNow(), 3000);
      } else {
      
        setTimeout(() => handleConfirmPayment(), 5000);
      }
    },
    onError: (err) => {
      toast({
        title: "Confirmation Failed",
        description: err?.message || "Unable to confirm payment.",
        variant: "destructive",
      });
      setPolling(false);
    },
  });

  const handleConfirmPayment = () => {
    if (!polling) setPolling(true);

    confirmPayment({
      cuscode: checkoutPayload?.customerId,
      transid: transactionId || '""',
    });
  };

  useEffect(() => {
    if (transactionId) handleConfirmPayment();
  }, [transactionId]);

  return (
<div className="d-flex justify-content-center align-items-center bg-gray-100 min-vh-100 ">
  <div className=" rounded-3 p-4 p-md-5 text-center  " style={{ maxWidth: '800px' }}>
    <div className="mb-3">
      <span className="waiting-dots  ">    <DotLoader
     
      size={15}  
      speedMultiplier={1.5} 
    /></span>
    </div>

    <h3 className="fw-bold text-main mb-4">
      Waiting for you
    </h3>

    <p>Please follow the instructions and do not refresh or leave this page.</p>
    <p>This may take up to 2 minutes.</p>
    <p className="border rounded-3 p-4 p-md-5 text-center bg-light fw-medium shadow-sm">You will receive a prompt on your mobile number to enter your PIN to authorize your payment request.</p>

    {isLoading && <p className="mt-3  text-secondary">Checking payment status...</p>}
  </div>
</div>
  );
};

export default Confirm;