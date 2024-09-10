import { Link, useLocation } from "react-router-dom";

// Modules
import { SearchIcon } from "./modules";

export default function Header () {
  const location = useLocation();

  return (
    <header>
      <Link to="/"><img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="Silver K Gallery" /></Link>

      {/* Links */}
      <nav>
        <Link to="/" className={location.pathname === "/" ? "selected" : ""}>Home</Link>
        <Link to="/collection" className={location.pathname.includes("/collection") ? "selected" : ""}>Our Collection</Link>
        <Link to="/events" className={location.pathname === "/events" ? "selected" : ""}>Events</Link>
        <Link to="/contactus" className={location.pathname === "/contactus" ? "selected" : ""} style={{ marginRight: "20px"}}>Contact Us</Link>

        <SearchIcon classname="header-search-icon" size={24} />
      </nav>
    </header>
  );
}