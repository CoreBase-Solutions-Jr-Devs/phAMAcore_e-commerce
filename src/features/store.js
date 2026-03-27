import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import locationReducer from "./locationSlice";
import checkoutReducer from "./checkoutSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// 🔹 Combine reducers
const rootReducer = combineReducers({
  itemCart: cartReducer,
  auth: authReducer,
   location: locationReducer,
     checkout:checkoutReducer,
});

// 🔹 Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["itemCart"], // 👈 only persist cart (recommended)
};

// 🔹 Wrap reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔹 Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 🔹 Persistor
export const persistor = persistStore(store);