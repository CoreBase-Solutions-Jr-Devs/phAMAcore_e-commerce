import React from "react";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routePaths";
import AccountPage from "@/pages/AccountPage";
import CheckoutPage from "@/pages/CheckoutPage";
import Account from "@/components/Account";

export const authenticationRoutePaths = [
    { path: AUTH_ROUTES.ACCOUNT, element: <AccountPage />},
];

export const protectedRoutePaths = [
    { path: PROTECTED_ROUTES.CHECKOUT, element: <CheckoutPage />},
    { path: PROTECTED_ROUTES.PROFILE, element: <Account />}
];