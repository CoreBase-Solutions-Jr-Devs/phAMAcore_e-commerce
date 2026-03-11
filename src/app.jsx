import React from "react";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import AppRoutes from "./routes";
import PhosphorIconInit from "./helper/PhosphorIconInit";
import 'react-phone-input-2/lib/style.css';
import "react-datepicker/dist/react-datepicker.css";


function App() {
  return (
    <>
    <RouteScrollToTop />
    <PhosphorIconInit />
    
    <AppRoutes /></>
  );
}

export default App;
