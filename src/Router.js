import { BrowserRouter, Routes, Route } from "react-router-dom";

// Global stylesheet
import "./styles.css";

// Documents
import Home from "./home/Home";
import Header from "./global/Header";
import Footer from "./global/Footer";


export default function Router () {
  return (
    <BrowserRouter>
      {/* Global items for all pages */}
      <Header />

      {/* Routed pages */}
      <Routes>
        <Route path="/" element={ <Home />} /> 

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}