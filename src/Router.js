import { BrowserRouter, Routes, Route } from "react-router-dom";

// Global stylesheet
import "./styles.css";

// Documents
import Home from "./home/Home";
import Header from "./global/Header";
import Footer from "./global/Footer";
import OurCollection from "./collection/Collection";
import NotFound from "./global/NotFound";


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
        {/* Beneath is so that the user can be redirected to not found */}
        <Route path="/error/page-not-found" element={ <NotFound />} />


      </Routes>

      <Footer />
    </BrowserRouter>
  );
}