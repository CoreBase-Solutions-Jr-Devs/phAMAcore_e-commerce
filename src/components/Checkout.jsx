import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../hooks/use-toast";
import { useMutation,useQuery } from "@tanstack/react-query";
import { CheckoutBasketMutationFn, getCurrentLocationQueryFn } from "../lib/api";
import { useSelector, useDispatch } from "react-redux";
import PayMethod from "../components/Checkout/PayMethod";
import Login from "../components/Checkout/login";
import RegisterModal from "../components/Checkout/Register";
import { fetchLocation, selectCurrentLocation } from "../features/locationSlice";
import { clearCart } from "../features/cartSlice";
import { selectCustomerId, selectIsAuthenticated } from "../features/authSlice";
import ShippingMethod from "./Checkout/shippingmethod";
import LogoutModal from "./Checkout/logout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCheckoutResponse, setCheckoutPayload  } from "../features/checkoutSlice";
// ------------------ Zod Schemas ------------------
const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
 emailAddress: z
  .string()
  .optional()
  .or(z.literal("")),
  addressLine: z.string().optional(),
  city: z.string().optional(),
  county: z.string().optional(),
  postalCode: z.string().optional(),
  landmark: z.string().optional(),
  country: z.string().optional(),
});

const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  billingAddress: z
    .union([addressSchema, z.undefined()])
    .optional(),
  paymentMethod: z.enum(["payment1", "payment2", "payment3", "payment4"]),
  notes: z.string().optional(),
}).refine((data) => {
  if (!data.billingAddress) return true;
  const { firstName, lastName, phoneNumber } = data.billingAddress;
  return firstName && lastName && phoneNumber;
}, {
  message: "Billing info incomplete",
  path: ["billingAddress"]
});

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const customerId = useSelector(selectCustomerId);
  const { cart } = useSelector((state) => state.itemCart);

const currentLocation = useSelector(selectCurrentLocation);
const { latitude, longitude } = useSelector((state) => state.location);
  const [selectedPayment, setSelectedPayment] = useState("payment1");
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("saved")
  const [shippingMessage, setShippingMessage] = useState(
    "Shipping charges will be calculated based on your shipping address"
  );
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
const [showLogoutModal, setShowLogoutModal] = useState(false);
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

  // ------------------ react-hook-form ------------------
const {
  register,
  handleSubmit,
  formState: { errors },
  setValue,
  watch,
} = useForm({
  resolver: zodResolver(checkoutSchema),
  defaultValues: {
    shippingAddress: { ...emptyAddress },
    billingAddress: undefined, 
    paymentMethod: selectedPayment,
    notes: "",
  },
});
console.log("FORM ERRORS:", errors);
  const watchedShipping = watch("shippingAddress");
  const watchedBilling = watch("billingAddress");


    
  //   enabled: isAuthenticated,
  //    select: (data) => data.shoppingCart?.items ?? [],
  // });
  
useEffect(() => {
  if (!latitude || !longitude) {
    dispatch(fetchLocation()); 
  }
}, [latitude, longitude, dispatch]);

  const { data: locationData } = useQuery({
      queryKey: ["current-location", latitude, longitude],
      queryFn: () => getCurrentLocationQueryFn({ latitude, longitude }),
      enabled: !!latitude && !!longitude,
    });
    useEffect(() => {
  if (deliveryOption === "current" && locationData) {
    const updatedAddress = {
      ...watchedShipping,
      city: locationData.city || watchedShipping.city,
      county: locationData.county || watchedShipping.county,
      postalCode: locationData.postalCode || watchedShipping.postalCode,
      country: locationData.country || watchedShipping.country,
      addressLine: locationData.formattedAddress || watchedShipping.addressLine,
    };

    Object.entries(updatedAddress).forEach(([key, value]) => {
      setValue(`shippingAddress.${key}`, value);
    });
  } else if (deliveryOption === "saved") {
    Object.keys(emptyAddress).forEach((key) =>
      setValue(`shippingAddress.${key}`, "")
    );
  }
}, [deliveryOption, locationData, setValue, watchedShipping]);
  const paymentEnumMap = {
    payment1: 1, // Mpesa
    payment2: 2, // Card
    payment3: 3, // Paybill
    payment4: 4, // CashOnDelivery
  };

  const { mutate: CheckoutBasket, isLoading } = useMutation({
    mutationFn: CheckoutBasketMutationFn,
    onSuccess: ( data) => {
     
    dispatch(setCheckoutResponse(data));

      toast({
        title: "Payment Confirmed ✅",
        description: "Your order has been processed successfully.",
        variant: "success",
      });
      setTimeout(() => {
        navigate("/payment");
      }, 5000);
      //  dispatch(clearCart());
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
    const method = event.target.id;
    setSelectedPayment(method);
    setValue("paymentMethod", method);
  };

  useEffect(() => {
  setValue("paymentMethod", selectedPayment);
}, [selectedPayment, setValue]);

useEffect(() => {
  if (!useDifferentBilling) {
    setValue("billingAddress", undefined);
  }
}, [useDifferentBilling, setValue]);

 const onSubmit = (data) => {
   console.log("SUBMITTED DATA:", data);
  const items = cart.map((item) => ({
    productId:  item.id,
    quantity: item.quantity,
  }));

  const useShippingAsBilling = !useDifferentBilling;

  const payload = {
    basketCheckout: {
      customerId,
      useShippingAsBilling,

      items,

      shippingAddress: {
        ...data.shippingAddress,
        location:  locationData,
      },

      // ✅ FIXED billing logic
      billingAddress: useShippingAsBilling
        ? null
        : {
            ...data.billingAddress,
            location:  locationData,
          },

      payment: {
        method: paymentEnumMap[selectedPayment],
        phoneNumber: data.shippingAddress.phoneNumber,

      
        transactionReference: null,
        cardName:
          selectedPayment === "payment2" ? card.name : null,
        cardNumberMasked:
          selectedPayment === "payment2"
            ? card.number.slice(-4).padStart(card.number.length, "*")
            : null,
      },

      notes: data.notes,
    },
  };

   dispatch(setCheckoutPayload(payload.basketCheckout));
console.log("DISPATCHING:", payload.basketCheckout);
  CheckoutBasket(payload);
};

  const numberFormatter = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  });

  const subTotal = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const deliveryFee = 0;
  const total = subTotal + deliveryFee;

  // ------------------ JSX ------------------
  return (
    <section className="checkout py-40">
      <div className="container container-lg">
        {/* Login / Account */}
      <div className="border border-gray-100 rounded-8 px-30 py-20 mb-20">
  {isAuthenticated ? (
    <span>
      You are logged in.{" "}
   <Link
  onClick={() => setShowLogoutModal(true)}
  className="fw-semibold text-main-600 hover-text-decoration-underline"
>
  Log out
</Link>
<LogoutModal
  show={showLogoutModal}
  onClose={() => setShowLogoutModal(false)}
/>
    </span>
  ) : (
    <span>
      Have an account?{" "}
      <Link
        onClick={() => setShowLoginModal(true)}
        className="fw-semibold text-main-600 hover-text-decoration-underline hover-text-main-600"
      >
        Log in
      </Link>

      {/* {" | "}

      <Link
        onClick={() => setShowRegisterModal(true)}
        className="fw-semibold text-main-600 hover-text-decoration-underline hover-text-main-600"
      >
        Sign up
      </Link> */}

      {/* Login Modal */}
      <Login
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onOpenRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      {/* Register Modal */}
      <RegisterModal
        show={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onOpenLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </span>
  )}
</div>
<form className="pe-xl-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {/* Shipping / Billing Form */}
          <div className="col-xl-8 col-lg-7">
        
<div className="border rounded-8 p-16 mb-24">
  <div className="row">
   <div className="col">
     <div className="form-check common-check common-radio">
   
    <input
      type="radio"
      name="deliveryOption"
      value="saved"
      id="savedAddress"
      checked={deliveryOption === "saved"}
      onChange={() => setDeliveryOption("saved")}
      className="form-check-input"
    />
       <label className="form-check-label" htmlFor="savedAddress">
    Saved Address
  </label>
  </div>
   </div>
 <div className="col">
  <div className="form-check common-check common-radio">
   
    <input
      type="radio"
      name="deliveryOption"
      value="current"
      id="currentLocation"
      checked={deliveryOption === "current"}
      onChange={() => setDeliveryOption("current")}
         className="form-check-input"
    />
     <label className="form-check-label" htmlFor="currentLocation">
    Use Current Location
  </label>
</div></div>
  </div>
 



</div>
        <h4 className="mb-24">Shipping Address</h4>   


  <div className="row gy-3">
    {/* First Name */}
    <div className="col-sm-6 col-xs-6">
      <input
        type="text"
        className="common-input border-gray-100"
        placeholder="First Name"
        {...register("shippingAddress.firstName")}
      />
      {errors.shippingAddress?.firstName && (
        <p className="text-red-600 text-xs mt-1">
          {errors.shippingAddress.firstName.message}
        </p>
      )}
    </div>

    {/* Last Name */}
    <div className="col-sm-6 col-xs-6">
      <input
        type="text"
        className="common-input border-gray-100"
        placeholder="Last Name"
        {...register("shippingAddress.lastName")}
      />
      {errors.shippingAddress?.lastName && (
        <p className="text-red-600 text-xs mt-1">
          {errors.shippingAddress.lastName.message}
        </p>
      )}
    </div>

    {/* Phone Number */}
    <div className="col-sm-6 col-xs-6">
      <input
        type="tel"
        className="common-input border-gray-100"
        placeholder="Phone Number"
        {...register("shippingAddress.phoneNumber")}
      />
      {errors.shippingAddress?.phoneNumber && (
        <p className="text-red-600 text-xs mt-1">
          {errors.shippingAddress.phoneNumber.message}
        </p>
      )}
    </div>

    {/* Email Address */}
    <div className="col-sm-6 col-xs-6">
      <input
        type="email"
        className="common-input border-gray-100"
        placeholder="Email Address"
        {...register("shippingAddress.emailAddress")}
      />
      {errors.shippingAddress?.emailAddress && (
        <p className="text-red-600 text-xs mt-1">
          {errors.shippingAddress.emailAddress.message}
        </p>
      )}
    </div>

    {/* Address Line */}
    <div className="col-sm-6 col-xs-6">
      <input
        type="text"
        className="common-input border-gray-100"
        placeholder="Address Line"
        {...register("shippingAddress.addressLine")}
      />
    </div>

    {/* City */}
    <div className="col-sm-6 col-xs-6">
      <input
        type="text"
        className="common-input border-gray-100"
        placeholder="City"
        {...register("shippingAddress.city")}
      />
    </div>

    {/* County */}
    <div className="col-sm-6 col-xs-6">
      <input
        type="text"
        className="common-input border-gray-100"
        placeholder="County"
        {...register("shippingAddress.county")}
      />
    </div>

    {/* Postal Code */}
    <div className="col-sm-6 col-xs-6">
      <input
        type="text"
        className="common-input border-gray-100"
        placeholder="Postal Code"
        {...register("shippingAddress.postalCode")}
      />
    </div>

    {/* Landmark */}
    <div className="col-sm-6 col-xs-6">
      <input
        type="text"
        className="common-input border-gray-100"
        placeholder="Landmark"
        {...register("shippingAddress.landmark")}
      />
    </div>

    {/* Country */}
    <div className="col-sm-6 col-xs-6">
      <input
        type="text"
        className="common-input border-gray-100"
        placeholder="Country"
        {...register("shippingAddress.country")}
      />
    </div>
  </div>

  {/* Additional Notes */}
  <div className="my-10">
    <h6 className="text-lg mb-24">Additional Information</h6>
    <input
      type="text"
      className="common-input border-gray-100"
      placeholder="Notes about your order, e.g. special notes for delivery."
      {...register("notes")}
    />
  </div>

           
            <div className="form-check mt-8">
              <input
                className="form-check-input"
                type="checkbox"
                checked={useDifferentBilling}
                onChange={(e) => setUseDifferentBilling(e.target.checked)}
                id="differentBilling"
              />
              <label
                className="form-check-label"
                htmlFor="differentBilling"
              >
                Use different billing address
              </label>
            </div>

            {/* Billing Address */}
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
                        {...register(`billingAddress.${field}`)}
                      />
                      {errors.billingAddress?.[field] && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.billingAddress[field]?.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ShippingMethod onChangeMessage={setShippingMessage} />
          </div>

          {/* Sidebar */}
          <div className="col-xl-4 col-lg-5">
            <div className="checkout-sidebar">
              <div className="bg-color-three rounded-8 p-24 text-center">
                <span className="text-gray-900 text-xl fw-semibold">
                  Your Orders
                </span>
              </div>

              {/* Products */}
              <div className="border border-gray-100 rounded-8 px-16 py-16 mt-16">
                <div className="mb-12 pb-12 border-bottom border-gray-100 flex-between gap-4">
                  <span className="text-gray-900 fw-medium text-lg font-heading-two">
                    Product
                  </span>
                  <span className="text-gray-900 fw-medium text-lg font-heading-two">
                    Subtotal
                  </span>
                </div>
                {cart.map((product) => (
                  <div key={product.id} className="flex-between gap-12 mb-8">
                    <div className="flex-align gap-8">
                      <span className="text-gray-900 fw-normal text-sm font-heading-two">
                        {product.name}
                      </span>
                      <span className="text-gray-900 fw-normal text-sm font-heading-two">
                        <i className="ph-bold ph-x" />
                      </span>
                      <span className="text-gray-900 fw-semibold text-sm font-heading-two">
                        {product.quantity}
                      </span>
                    </div>
                    <span className="text-gray-900 fw-bold text-sm font-heading-two">
                      {numberFormatter.format(product.price * product.quantity)}
                    </span>
                  </div>
                ))}

                {/* Totals */}
                <div className="border-top border-gray-100 pt-12 mt-12">
                  <div className="mb-8 flex-between gap-4">
                    <span className="text-gray-900 font-heading-two text-lg fw-semibold">
                      Subtotal
                    </span>
                    <span className="text-gray-900 font-heading-two text-sm fw-bold">
                      {numberFormatter.format(subTotal)}
                    </span>
                  </div>
                  <div className="mb-8 flex-between gap-4">
                    <span className="text-gray-900 font-heading-two text-lg fw-semibold">
                      Delivery
                    </span>
                    <span className="text-gray-900 font-heading-two text-sm fw-bold">
                      {numberFormatter.format(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex-between gap-4">
                    <span className="text-gray-900 font-heading-two text-lg fw-semibold">
                      Total
                    </span>
                    <span className="text-gray-900 font-heading-two text-sm fw-bold">
                      {numberFormatter.format(total)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-8 flex-between gap-4">
                <span className="text-gray-900 font-heading-two text-xs fw-base">
                  {shippingMessage}
                </span>
              </div>

              <PayMethod
                selectedPayment={selectedPayment}
                handlePaymentChange={handlePaymentChange}
                card={card}
                setCard={setCard}
                formData={watchedShipping}
                useDifferentBilling={useDifferentBilling}
              />

              <div className="mt-32 pt-32 border-top border-gray-100">
                <p className="text-gray-500">
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our{" "}
                  <Link
                    to="#"
                    className="text-main-600 text-decoration-underline"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
              </div>

          <button
  type="submit"
  className="btn btn-main mt-40 py-18 w-100 rounded-8"
  disabled={isLoading}
>
  {isLoading ? "Processing..." : "Proceed to payment"}
</button>
            </div>
          </div>
        </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;