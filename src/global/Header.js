import { Link, useLocation } from "react-router-dom";
import { motion, useInView } from "framer-motion";

// Modules
import { SearchIcon } from "./modules";
import { useEffect, useRef, useState } from "react";

export default function Header () {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // For making sure the menu disappears if the page is resized
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1030) setMobileMenuOpen(false);
    });
  });

  // The mobile menu animation entrance effect
  const mobileNavRef = useRef(null);
  const isMobileMenuInView = useInView(mobileNavRef, {
    once: false,
    amount: 0.5
  })

  return (
    <header>
      <Link to="/"><img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="Silver K Gallery" /></Link>

      {/* Links */}
      <nav className="pc">
        <Link to="/" className={location.pathname === "/" ? "selected" : ""}>Home</Link>
        <Link to="/collection" className={location.pathname.includes("/collection") ? "selected" : ""}>Our Collection</Link>
        <Link to="/events" className={location.pathname === "/events" ? "selected" : ""}>Events</Link>
        <Link to="/contactus" className={location.pathname === "/contactus" ? "selected" : ""} style={{ marginRight: "10px"}}>Contact Us</Link>

        <SearchIcon classname="header-search-icon" size={24} />
        <button onClick={() => {mobileMenuOpen ? setMobileMenuOpen(false) : setMobileMenuOpen(true)}}><div className={mobileMenuOpen ? "open" : undefined}></div></button>
      </nav>

      {/* The mobile menu */}
      <motion.nav
      ref={mobileNavRef}
      initial={{ opacity: 0, height: 0 }}
      animate={isMobileMenuInView ? { opacity: 1, height: 216} : {opacity: 0, height: 0}}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} 
      className="mobile" style={{ display: mobileMenuOpen ? "flex" : "none"}}>
        <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={isMobileMenuInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100}}
        transition={{ duration: 0.2, ease:[0.16, 1, 0.3, 1]}}
        ><Link to="/" onClick={() => { setMobileMenuOpen(false); }} >Home</Link></motion.div>
        <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={isMobileMenuInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100}}
        transition={{ duration: 0.2, ease:[0.16, 1, 0.3, 1], delay: 0.1}}
        ><Link to="/collection" onClick={() => { setMobileMenuOpen(false); }}>Our Collection</Link></motion.div>
        <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={isMobileMenuInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100}}
        transition={{ duration: 0.2, ease:[0.16, 1, 0.3, 1], delay: 0.2}}
        ><Link to="/events" onClick={() => { setMobileMenuOpen(false); }}>Events</Link></motion.div>
        <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={isMobileMenuInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100}}
        transition={{ duration: 0.2, ease:[0.16, 1, 0.3, 1], delay: 0.3}}
        > <Link to="/contactus" onClick={() => { setMobileMenuOpen(false); }}>Contact Us</Link></motion.div>
      </motion.nav>

    </header>
  );
}