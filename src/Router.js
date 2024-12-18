import { BrowserRouter, Routes, Route } from "react-router-dom";

// Global stylesheet
import "./styles.css";

// Documents
import Home from "./home/Home";
import Header from "./global/Header";
import Footer from "./global/Footer";
import OurCollection from "./collection/Collection";
import NotFound from "./global/NotFound";
import { ScrollButton } from "./global/modules";
import Product from "./collection/selector/Product";
import ContactUs from "./contact/ContactUs";
import PrivacyPolicy from "./global/privacypolicy";
import Exhibition from "./exhibition/exhibition";

export default function Router () {
  return (
    <BrowserRouter basename="/silverkgallery">
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"></link>

      {/* Global items for all pages */}
      <Header />

      {/* Routed pages */}
      <Routes>
        <Route path="/" element={ <Home />} /> 

        {/* Collection pathway */}
        <Route path="/collection/:categories?/:themes?" element={ <OurCollection /> } />

        {/* For if the page is not found */}
        <Route path="*" element={<NotFound />} />

        {/* For contact us */}
        <Route path="/contactus" element={<ContactUs />} />

        {/* For the privacy policy */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* For the exhibitions page */}
        <Route path="/exhibitions" element={<Exhibition />} />

        <Route path="/collection/:categories/:themes/:id" element={ <Product /> } />
      </Routes>

      <Footer />

      {/* For the scroll button when the user has scrolled down too far (accessibility) */}
      <ScrollButton />
    </BrowserRouter>
  );
}