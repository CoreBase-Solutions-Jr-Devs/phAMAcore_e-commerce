import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePageOne from "../pages/HomePageOne";
import HomePageTwo from "../pages/HomePageTwo";
import HomePageThree from "../pages/HomePageThree";
import ShopPage from "../pages/ShopPage";
import ProductDetailsPageOne from "../pages/ProductDetailsPageOne";
import ProductDetailsPageTwo from "../pages/ProductDetailsPageTwo";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import AccountPage from "../pages/AccountPage";
import BlogPage from "../pages/BlogPage";
import BlogDetailsPage from "../pages/BlogDetailsPage";
import ContactPage from "../pages/ContactPage";
import VendorPage from "../pages/VendorPage";
import VendorDetailsPage from "../pages/VendorDetailsPage";
import VendorTwoPage from "../pages/VendorTwoPage";
import VendorTwoDetailsPage from "../pages/VendorTwoDetailsPage";
import BecomeSellerPage from "../pages/BecomeSellerPage";
import WishlistPage from "../pages/WishlistPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageOne />} />
      <Route path="/index-two" element={<HomePageTwo />} />
      <Route path="/index-three" element={<HomePageThree />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/product-details" element={<ProductDetailsPageOne />} />
      <Route path="/product-details-two" element={<ProductDetailsPageTwo />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/become-seller" element={<BecomeSellerPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog-details" element={<BlogDetailsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/vendor" element={<VendorPage />} />
      <Route path="/vendor-details" element={<VendorDetailsPage />} />
      <Route path="/vendor-two" element={<VendorTwoPage />} />
      <Route path="/vendor-two-details" element={<VendorTwoDetailsPage />} />
    </Routes>
  );
};

export default AppRoutes;
