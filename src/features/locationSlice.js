// store/locationSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getUserLocation, checkDelivery } from "../helper/location";

const initialState = {
  latitude: null,
  longitude: null,
  city: "",
  deliveryStatus: "",
  loading: false,
  error: null,
   currentLocation: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setLocation: (state, action) => {
      const { latitude, longitude, city } = action.payload;
      state.latitude = latitude;
      state.longitude = longitude;
      state.city = city;
      
      state.loading = false;
      state.error = null;
      
    },
//     setCurrentLocation: (state, action) => {
//   state.currentLocation = action.payload; // store the full object
// },
    setDeliveryStatus: (state, action) => {
      state.deliveryStatus = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearLocation: (state) => {
      state.latitude = null;
      state.longitude = null;
      state.city = "";
      state.deliveryStatus = "";
      state.loading = false;
      state.error = null;
    },
  },
});

// Action creators
export const {
  startLoading,
  setLocation,
  setDeliveryStatus,
  setError,
  clearLocation,
    setCurrentLocation,
} = locationSlice.actions;

export const selectCurrentLocation = (state) => state.location.currentLocation;

// Helper function to fetch location (can be called like a thunk)
export const fetchLocation = (deliveryZone) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const location = await getUserLocation();
    dispatch(setLocation(location));
dispatch(setCurrentLocation(location));
    if (deliveryZone) {
      const status = checkDelivery(
        location.latitude,
        location.longitude,
        deliveryZone,
      );
      dispatch(setDeliveryStatus(status));
    }
  } catch (err) {
    dispatch(setError(err));
  }
};

export default locationSlice.reducer;
