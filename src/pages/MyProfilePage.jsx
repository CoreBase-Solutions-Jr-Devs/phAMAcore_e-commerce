/* eslint-disable no-unused-vars */
import React from "react";
import Preloader from "../helper/Preloader";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
import ShippingOne from "../components/ShippingOne";
import MyProfile from "@/components/MyProfile";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";

const MyProfilePage = () => {
    return (
        <>
            {/* ColorInit */}
            <ColorInit color={true} />

            {/* ScrollToTop */}
            <ScrollToTop smooth color="#FA6400" />

            {/* Preloader */}
            <Preloader />

            {/* HeaderTwo */}
            <HeaderTwo category={true} />

            {/* Breadcrumb */}
            <Breadcrumb title={"My Profile"} />

            {/* MyProfile */}
            <MyProfile />

            {/* ShippingOne */}
            <ShippingOne />

            {/* FooterTwo */}
            <FooterTwo />

            {/* BottomFooter */}
            <BottomFooter />
        </>
    );
};

export default MyProfilePage;