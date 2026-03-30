import { createSlice } from "@reduxjs/toolkit";

const loadAuthFromStorage = () => {
    try {
        const serialized = localStorage.getItem("auth");
        return serialized ? JSON.parse(serialized) : null;
    } catch {
        return null;
    }
};

const savedAuth = loadAuthFromStorage();

const initialState = {
    isSuccess: savedAuth?.isSuccess ?? false,
    accessToken: savedAuth?.accessToken ?? null,
    refreshToken: savedAuth?.refreshToken ?? null,
    accessTokenExpiresAtUtc: savedAuth?.accessTokenExpiresAtUtc ?? null,
    user: savedAuth?.user ?? null,
    customerId: savedAuth?.user?.id ?? null,
    isAuthenticated: !!savedAuth?.accessToken,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        setCredentials: (state, action) => {
            const { isSuccess, accessToken, refreshToken, accessTokenExpiresAtUtc, user } = action.payload;

            state.isSuccess = isSuccess;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.accessTokenExpiresAtUtc = accessTokenExpiresAtUtc;
            state.user = user;
            state.customerId = user?.id ?? null;
            state.isAuthenticated = !!accessToken;

            localStorage.setItem("auth", JSON.stringify({
                isSuccess,
                accessToken,
                refreshToken,
                accessTokenExpiresAtUtc,
                user,
            }));
        },

        updateCredentials: (state, action) => {
            const { accessToken, refreshToken, accessTokenExpiresAtUtc } = action.payload;

            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.accessTokenExpiresAtUtc = accessTokenExpiresAtUtc;
            state.isAuthenticated = !!accessToken;

            const stored = loadAuthFromStorage();
            localStorage.setItem("auth", JSON.stringify({
                ...stored,
                accessToken,
                refreshToken,
                accessTokenExpiresAtUtc,
            }));
        },

        logout: (state) => {
            state.isSuccess = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.accessTokenExpiresAtUtc = null;
            state.user = null;
            state.customerId = null;
            state.isAuthenticated = false;

            localStorage.removeItem("auth");
            console.log("Auth after removal:", localStorage.getItem("auth"));
        },
    },
});

export const { setCredentials, updateCredentials, logout } = authSlice.actions;

export const selectCurrentUser       = (state) => state.auth.user;
export const selectCustomerId        = (state) => state.auth.customerId;
export const selectAccessToken       = (state) => state.auth.accessToken;
export const selectIsAuthenticated   = (state) => state.auth.isAuthenticated;
export const selectTokenExpiry       = (state) => state.auth.accessTokenExpiresAtUtc;

export default authSlice.reducer;