import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { validateCardNumber, validateExpirationDate, validateCvv, validateCardholderName } from "../../utils/card-validator";
import { getCardType, PaymentIcon } from "react-svg-credit-card-payment-icons";
import { toast } from "../../hooks/use-toast";
import { useDispatch } from "react-redux";
import { setCardInfo } from "../../features/checkoutSlice";
const PayMethod = ({
  selectedPayment,
  handlePaymentChange,
  card,
  setCard,
  formData,
  useDifferentBilling,
}) => {
  const dispatch = useDispatch();
   const cardSchema = z.object({
    cardNumber: z.string().min(1, "Card number is required"),
    expiry: z.string().optional(),
    cvv: z.string().optional(),
    cardName: z.string().min(1, "Cardholder name is required"),
  }).superRefine((data, ctx) => {
    const cardResult = validateCardNumber(data.cardNumber);
    if (!cardResult.isValid) ctx.addIssue({ path: ["cardNumber"], code: z.ZodIssueCode.custom, message: cardResult.message });

    const [month, year] = data.expiry.split("/").map(v => v.trim());
    if (!month || !year) ctx.addIssue({ path: ["expiry"], code: z.ZodIssueCode.custom, message: "Expiry format MM/YY" });
    else {
      const expiryResult = validateExpirationDate(month, year);
      if (!expiryResult.isValid) ctx.addIssue({ path: ["expiry"], code: z.ZodIssueCode.custom, message: expiryResult.message });
    }

    const cardType = cardResult.card?.type || null;
    const cvvResult = validateCvv(data.cvv, cardType);
    if (!cvvResult.isValid) ctx.addIssue({ path: ["cvv"], code: z.ZodIssueCode.custom, message: cvvResult.message });

    const nameResult = validateCardholderName(data.cardName);
    if (!nameResult.isValid) ctx.addIssue({ path: ["cardName"], code: z.ZodIssueCode.custom, message: nameResult.message });
  });

  const form = useForm({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: card.number || "",
      expiry: card.expiry || "",
      cvv: card.cvv || "",
      cardName: card.name || "",
    },
    mode: "onChange", // validate on input change
  });

  const values = form.watch();

  // Update card state automatically on change
  useEffect(() => {
    setCard(prev => ({ ...prev, ...values }));
  }, [values, setCard]);

 const cardNumberValue = form.watch("cardNumber");
const detectedType = getCardType(cardNumberValue);

useEffect(() => {
  setCard(prev => ({ ...prev, type: detectedType }));

  // Dispatch card info to Redux
  dispatch(
    setCardInfo({
      type: detectedType,               // card type like "Visa"
      icon: detectedType,               // optional: store same value for icon reference
      last4: cardNumberValue.slice(-4), // last 4 digits of the card
    })
  );
}, [detectedType, cardNumberValue, dispatch]);

  const steps = [
    { type: "text", content: "Go to M-PESA on your phone" },
    { type: "text", content: "Select Pay Bill" },
    {
      type: "text",
      content: (
        <>
          Enter Business Number: <strong>220220</strong>
        </>
      ),
    },
    {
      type: "text",
      content: (
        <>
          Enter Account Number: <strong></strong>
        </>
      ),
    },
    { type: "amount", label: "Enter Amount (KES)"},
    {
      type: "text",
      content: (
        <>
          Enter <strong>M-PESA PIN</strong> and press Send
        </>
      ),
    },
    { type: "text", content: "Receive an SMS from M-PESA" },
    {
      type: "text",
      content: (
        <>
          Click the <strong>Confirm</strong> button  to finalize payment
        </>
      ),
    },
  ];
  return (
    <div className="mt-32">
      <h3 className="fw-semibold mb-24">Payment Method</h3>

      {/* M-PESA */}
      <div className="payment-item">
        <div className="form-check common-check common-radio py-16 mb-0">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            id="payment1"
            checked={selectedPayment === "payment1"}
            onChange={handlePaymentChange}
          />
          <label
            className="form-check-label fw-semibold text-neutral-600"
            htmlFor="payment1"
          >
            M-PESA
          </label>
        </div>
        {selectedPayment === "payment1" && (
          <div className="payment-item__content px-16 py-24 rounded-8 bg-main-50 position-relative d-block mt-16">
            <label className="mb-8 fw-medium">Phone Number</label>
            <input
              type="text"
              className="common-input"
         value={formData?.phoneNumber || ""}
              placeholder="2547XXXXXXXX"
            />
          </div>
        )}
      </div>

      {/* Card Payment */}
     <div className="payment-item">
      <div className="form-check common-check common-radio py-16 mb-0">
        <input
          className="form-check-input"
          type="radio"
          name="payment"
          id="payment2"
          checked={selectedPayment === "payment2"}
          onChange={handlePaymentChange}
        />
        <label className="form-check-label fw-semibold text-neutral-600" htmlFor="payment2">
          Card Payment
        </label>
      </div>

      {selectedPayment === "payment2" && (
        <div className="payment-item__content px-16 py-24 rounded-8 bg-main-50 position-relative d-block mt-16">
          {/* Card Number */}
         <div className="mb-10 relative">
            <label className="mb-8 fw-medium">Card Number</label>
            {/* {detectedType && <PaymentIcon type={detectedType} width={28}   className="absolute left-3 top-1/2 -translate-y-1/2" />} */}
            <input
              type="text"
              maxLength={19}
              className="form-control pl-12"
              placeholder="1234 5678 1234 5678"
              {...form.register("cardNumber")}
            />
            <p className="text-red-600 text-sm">{form.formState.errors.cardNumber?.message}</p>
          </div>

          {/* Expiry + CVV */}
          <div className="row g-2 mb-16">
            <div className="col-md-6">
              <label className="mb-8 fw-medium">Expiry</label>
              <input type="text" placeholder="MM/YY" className="form-control" {...form.register("expiry")} />
              <p className="text-red-600 text-sm">{form.formState.errors.expiry?.message}</p>
            </div>
            <div className="col-md-6">
              <label className="mb-8 fw-medium">CVV</label>
              <input type="password" maxLength={4} placeholder="123" className="form-control" {...form.register("cvv")} />
              <p className="text-red-600 text-sm">{form.formState.errors.cvv?.message}</p>
            </div>
          </div>

          {/* Cardholder Name */}
          <div className="mb-16">
            <label className="mb-8 fw-medium">Name on Card</label>
            <input type="text" placeholder="John Doe" className="form-control" {...form.register("cardName")} />
            <p className="text-red-600 text-sm">{form.formState.errors.cardName?.message}</p>
          </div>
        </div>
      )}
    </div>

        <div className="payment-item">
                  {" "}
                  <div className="form-check common-check common-radio py-16 mb-0">
                    {" "}
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment"
                      id="payment3"
                      checked={selectedPayment === "payment3"}
                      onChange={handlePaymentChange}
                    />{" "}
                    <label
                      className="form-check-label fw-semibold text-neutral-600"
                      htmlFor="payment3"
                    >
                      Paybill
                    </label>{" "}
                  </div>{" "}
                  {selectedPayment === "payment3" && (
                    <div className="payment-item__content px-16 py-24 rounded-8 bg-main-50 position-relative d-block mt-16">
                      <ol className="list-unstyled">
                        {steps.map((step, index) => (
                          <li
                            key={index}
                            className="d-flex align-items-start mb-3"
                          >
                            {/* Step Number */}
                            <span
                              className="d-flex align-items-center justify-content-center rounded-circle me-2"
                              style={{
                                width: "24px",
                                height: "24px",
                                backgroundColor: "#663300",
                                color: "#fff",
                                fontSize: "12px",
                                flexShrink: 0,
                              }}
                            >
                              {index + 1}
                            </span>

                            {/* Step Content */}
                            <div className="flex-grow-1">
                              {/* TEXT STEP */}
                              {step.type === "text" && (
                                <span>{step.content}</span>
                              )}

                              {/* AMOUNT STEP */}
                              {step.type === "amount" && (
                                <div>
                                  <label className="form-label mb-1">
                                    {step.label}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control w-auto"
                                    readOnly
                                    value={step.value}
                                    style={{ maxWidth: "160px" }}
                                  />
                                </div>
                              )}

                              {/* CUSTOM STEP */}
                              {step.type === "custom" && (
                                <div className="mt-1">{step.content}</div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}{" "}
                </div>{" "}
                {/* Cash On Delivery */}{" "}
                <div className="payment-item">
                  {" "}
                  <div className="form-check common-check common-radio py-16 mb-0">
                    {" "}
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment"
                      id="payment4"
                      checked={selectedPayment === "payment4"}
                      onChange={handlePaymentChange}
                    />{" "}
                    <label
                      className="form-check-label fw-semibold text-neutral-600"
                      htmlFor="payment4"
                    >
                      Cash On Delivery
                    </label>{" "}
                  </div>{" "}
                  {selectedPayment === "payment4" && (
                    <div className="payment-item__content px-16 py-24 rounded-8 bg-main-50 position-relative d-block mt-16">
                      {" "}
                      <p>Pay with cash upon delivery.</p>{" "}
                    </div>
                  )}{" "}
                </div>{" "}
    </div>
  );
};

export default PayMethod;

