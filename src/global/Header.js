import { Link } from "react-router-dom";
import "./header.css";

// Modules
import { SearchIcon } from "./icons";

export default function Header () {
  return (
    <header>
      <Link to="/"><img src="/img/logo.png" alt="Silver K Gallery" /></Link>

      {/* Links */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/collection">Our Collection</Link>
        <Link to="/events">Events</Link>
        <Link to="/contactus" style={{ marginRight: "20px"}}>Contact Us</Link>

        <SearchIcon classname="header-search-icon" size={24} />
      </nav>
    </header>
  );
}