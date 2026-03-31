import React from "react";
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
import ShippingOne from "../components/ShippingOne";
import ScrollToTop from "react-scroll-to-top";
import PayNow from "../components/Checkout/PayNow";
const Payment = () => {
  return (
    <div>
                {/* ColorInit */}
                <ColorInit color={true} />
          
                {/* ScrollToTop */}
                <ScrollToTop smooth color="#FA6400" />
          
                {/* Preloader */}
                <Preloader />
          
                {/* HeaderTwo */}
                <HeaderTwo category={true} />
          
                {/* Breadcrumb */}
                <Breadcrumb title={"Payment"} />
          
                {/* CartSection */}
                <PayNow />
          
                {/* ShippingOne */}
                <ShippingOne />
          
                {/* FooterTwo */}
                <FooterTwo />
          
                {/* BottomFooter */}
                <BottomFooter />
          
    </div>
  )
}

export default Payment
