import { BrowserRouter, Routes, Route } from "react-router-dom";

// Global stylesheet
import "./styles.css";

// Documents
import Home from "./home/Home";
import Header from "./global/Header";
import Footer from "./global/Footer";
import OurCollection from "./collection/Collection";


export default function Router () {
  return (
    <BrowserRouter basename="/silverkgallery">
      {/* Global items for all pages */}
      <Header />

      {/* Routed pages */}
      <Routes>
        <Route path="/" element={ <Home />} /> 

        {/* Collection pathway */}
        <Route path="/collection" element={ <OurCollection />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}