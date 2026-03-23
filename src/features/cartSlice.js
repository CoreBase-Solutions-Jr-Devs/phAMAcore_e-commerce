import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

export const itemCartSlice = createSlice({
    name: "itemCart",
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            const existingItem = state.cart.find(
                (item) => item.id === action.payload.id,
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItemFromCart: (state, action) => {
            const existingItem = state.cart.find(
                (item) => item.id === action.payload,
            );

            if (!existingItem) return;

            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else {
                state.cart = state.cart.filter((item) => item.id !== action.payload);
            }
        },
        increaseQty: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);

            if (item) {
                item.quantity += 1;
            }
        },
        deleteItemFromCart: (state, action) => {
            const existingItem = state.cart.find(
                (item) => item.id === action.payload,
            );

            if (!existingItem) return;

            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addItemToCart,
    removeItemFromCart,
    increaseQty,
    deleteItemFromCart,
} = itemCartSlice.actions;

export default itemCartSlice.reducer;
