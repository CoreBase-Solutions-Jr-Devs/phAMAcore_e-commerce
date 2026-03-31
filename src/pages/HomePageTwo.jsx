import React from "react";
import Preloader from "../helper/Preloader";
import HeaderTwo from "../components/HeaderTwo";
import BannerTwo from "../components/BannerTwo";
import NewsletterTwo from "../components/NewsletterTwo";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import BeautyOne from "../components/BeautyOne";
import NewArrivaltwo from "../components/NewArrivalTwo";
import PopularProductsThree from "../components/PopularProductsThree";
import TrendingThree from "../components/TrendingThree";
import TopSellingTwo from "../components/TopSellingTwo";
import BrandThree from "../components/BrandThree";

import VitaminOne from "@/components/VitaminOne";
import BlogHome from "@/components/BlogHome";
import Slogan from "@/components/Slogan";
import FaqSection from "@/components/FaqSection";
import TopSellingOne from "@/components/TopSellingOne";

const HomePageTwo = () => {


  return (

    <>
      {/* ColorInit */}
      <ColorInit color={true} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#FA6400" />

      {/* Preloader */}
      <Preloader />

      {/* HeaderTwo */}
      <HeaderTwo category={false} />

      {/* BannerTwo */}
      <BannerTwo />

   {/* PopularProductsThree */}
      <PopularProductsThree />

 {/* TrendingThree */}
      <TrendingThree />

   <NewArrivaltwo />

    <TopSellingOne/>


      {/* BrandThree */}
      <BrandThree />

      {/* Beauty Products */}
      <BeautyOne />

      {/* Vitamins & Supplements */}
      <VitaminOne />

      {/* Blog */}
      <BlogHome />

      {/* Slogan */}
      <Slogan />

      {/* FAQs */}
      <FaqSection />

      {/* NewsletterTwo */}
      <NewsletterTwo />

      {/* FooterTwo */}
      <FooterTwo />

      {/* BottomFooter */}
      <BottomFooter />


    </>
  );
};

export default HomePageTwo;
