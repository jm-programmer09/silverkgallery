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
import Item from "./collection/Item";


export default function Router () {
  return (
    <BrowserRouter basename="/silverkgallery">
      {/* Global items for all pages */}
      <Header />

      {/* Routed pages */}
      <Routes>
        <Route path="/" element={ <Home />} /> 

        {/* Collection pathway */}
        <Route path="/collection/:categories?/:themes?" element={ <OurCollection /> } />

        {/* For if the page is not found */}
        <Route path="*" element={<NotFound />} />

        <Route path="/collection/:categories?/:themes?/:id" element={ <Item /> } />
      </Routes>

      <Footer />

      {/* For the scroll button when the user has scrolled down too far (accessibility) */}
      <ScrollButton />
    </BrowserRouter>
  );
}