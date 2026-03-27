import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSuccess: false,
  orderId: null,
  checkoutId: null,
  subTotal: 0,
  deliveryFee: 0,
  vatAmount: 0,
  totalAmount: 0,
  deliveryDistanceKm: 0,
  chargeableDistanceKm: 0,
  createdAt: null,

  // NEW: store card info
  cardInfo: {
    type: null,   
    icon: null,     
    last4: null,   
    name: null,     
  },

  checkoutPayload: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutResponse: (state, action) => {
      const payload = action.payload;
      state.isSuccess = payload.isSuccess || false;
      state.orderId = payload.orderId || null;
      state.checkoutId = payload.checkoutId || null;
      state.subTotal = payload.subTotal || 0;
      state.deliveryFee = payload.deliveryFee || 0;
      state.vatAmount = payload.vatAmount || 0;
      state.totalAmount = payload.totalAmount || 0;
      state.deliveryDistanceKm = payload.deliveryDistanceKm || 0;
      state.chargeableDistanceKm = payload.chargeableDistanceKm || 0;
      state.createdAt = payload.createdAt || null;
    },

    setCheckoutPayload: (state, action) => {
      state.checkoutPayload = action.payload;
    },

    clearCheckout: (state) => {
      Object.keys(state).forEach((key) => (state[key] = initialState[key]));
    },

    // ✅ NEW: store card info
    setCardInfo: (state, action) => {
      state.cardInfo = {
        ...state.cardInfo,
        ...action.payload,
      };
    },
  },
});

// Actions
export const { setCheckoutResponse, clearCheckout, setCheckoutPayload, setCardInfo } =
  checkoutSlice.actions;

// Selectors
export const selectCheckoutResponse = (state) => state.checkout;
export const selectCheckoutPayload = (state) => state.checkout.checkoutPayload;
export const selectCardInfo = (state) => state.checkout.cardInfo;

export default checkoutSlice.reducer;