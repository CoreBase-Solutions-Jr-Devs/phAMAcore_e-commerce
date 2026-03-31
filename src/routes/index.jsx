/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePageTwo from "../pages/HomePageTwo";
import ShopPage from "../pages/ShopPage";
import ProductDetailsPageTwo from "../pages/ProductDetailsPageTwo";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import AccountPage from "../pages/AccountPage";
import BlogPage from "../pages/BlogPage";
import BlogDetailsPage from "../pages/BlogDetailsPage";
import ContactPage from "../pages/ContactPage";
import BecomeSellerPage from "../pages/BecomeSellerPage";
import WishlistPage from "../pages/WishlistPage";
import MyProfilePage from "@/pages/Myprofilepage";
import Confirm from "../components/Checkout/confirm";

import LogIn from "../components/Checkout/login";
import PayNow from "../components/Checkout/PayNow";
import Payment from "../pages/Payment";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/shop" replace />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/home" element={<HomePageTwo />} />
      <Route path="/product-details-two" element={<ProductDetailsPageTwo />} />
      <Route path="/product-details-two/:productId" element={<ProductDetailsPageTwo />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/become-seller" element={<BecomeSellerPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/account" element={<AccountPage />} />
       <Route path="/login" element={<LogIn/>} />
         <Route path="/confirm" element={<Confirm/>} />
          <Route path="/paynow" element={<PayNow/>} />
                    <Route path="/payment" element={<Payment/>} />

      <Route path="/profile" element={<MyProfilePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog-details" element={<BlogDetailsPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default AppRoutes;