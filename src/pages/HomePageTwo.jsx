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
import VitaminOne from "@/components/VitaminOne";
import BlogHome from "@/components/BlogHome";
import Slogan from "@/components/Slogan";
import FaqSection from "@/components/FaqSection";

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
