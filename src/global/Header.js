import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";

// Modules
import { SearchIcon } from "./modules";
import { useEffect, useRef, useState } from "react";
import data from "../products.json";

// For submitting the search request
function searchSubmit(navigate, request) {
  if (request && request.trim() !== "") {
    navigate(`/collection/?search=${encodeURIComponent(request.trim())}`);
  }
}

function DetailsComponent({ data }) {
  const [openDetail, setOpenDetail] = useState(null);
  const [shrunk, setShrunk] = useState(false);


  const detailsRefs = {
    'dc-comics': useRef(),
    'star-wars': useRef(),
    'warner-bros': useRef(),
    'photography': useRef(),
    'animation': useRef()
  };

  useEffect(() => {
    Object.entries(detailsRefs).forEach(([key, ref]) => {
      if (ref.current) {
        if (key === openDetail) {
          ref.current.setAttribute('open', '');
        } else {
          ref.current.removeAttribute('open');
        }
      }
    });
  }, [openDetail]);

  const handleToggle = (detailName) => {
    setOpenDetail(prev => prev === detailName ? null : detailName);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1165) {
        setShrunk(true);
      } else {
        setShrunk(false);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      { !shrunk ? (
        <>
          <details ref={detailsRefs['dc-comics']} onClick={(e) => { e.preventDefault(); handleToggle('dc-comics'); }}>
            <summary>DC Comics</summary>
            <ul>
              {Object.keys(data.animation["dc-comics"].subcategories).map((subcat, index) => (
                <li key={index}>
                  <Link to={`/collection/animation/dc-comics/?subdc-comics=${subcat}`}>{subcat.replaceAll("-", " ")}</Link>
                </li>
              ))}
            </ul>
          </details>

          <details ref={detailsRefs['star-wars']} onClick={(e) => { e.preventDefault(); handleToggle('star-wars'); }}>
            <summary>Star Wars</summary>
            <ul>
              {Object.keys(data.animation["star-wars"].subcategories).map((subcat, index) => (
                <li key={index}>
                  <Link to={`/collection/animation/dc-comics/?subdc-comics=${subcat}`}>{subcat.replaceAll("-", " ")}</Link>
                </li>
              ))}
            </ul>
          </details>

          <details ref={detailsRefs['warner-bros']} onClick={(e) => { e.preventDefault(); handleToggle('warner-bros'); }}>
            <summary>Warner Bros</summary>
            <ul>
              {Object.keys(data.animation["warner-bros"].subcategories).map((subcat, index) => (
                <li key={index}>
                  <Link to={`/collection/animation/dc-comics/?subdc-comics=${subcat}`}>{subcat.replaceAll("-", " ")}</Link>
                </li>
              ))}
            </ul>
          </details>


        </>
      ) : (
        <>
          <details ref={detailsRefs['animation']} onClick={(e) => { e.preventDefault(); handleToggle('animation'); }}>
            <summary>Animation</summary>

            <ul>
              {Object.keys(data.animation).map((theme, index) => (
                index < 6 && (
                  <li key={index}>
                    <Link to={`/collection/animation/${theme}`}>{theme.replaceAll("-", " ")}</Link>
                  </li>
                )

              ))}

            </ul>

          </details>

        </>
      )}

      <details ref={detailsRefs['photography']} onClick={(e) => { e.preventDefault(); handleToggle('photography'); }}>
        <summary>Photography</summary>
        <ul>
          {Object.keys(data.photography).map((theme, index) => (
            <li key={index}>
              <Link to={`/collection/photography/${theme}`}>{theme.replace("-", " ")}</Link>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}

export default function Header () {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  // for the search bar reference
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // For making sure the menu disappears if the page is resized
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1030) setMobileMenuOpen(false);
    });
  }, []);

  // This is for turning off the search bar and mobile menu shut when the url is changed
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchBarOpen(false);

    // To scroll the user back up
    window.scrollTo({
      top: 0, 
      left: 0, 
      behavior: "instant"
    });

  }, [location.pathname]);

  // The mobile menu animation entrance effect
  const mobileNavRef = useRef(null);
  const isMobileMenuInView = useInView(mobileNavRef, {
    once: false,
    amount: 0.5
  })

  // this is for the search bar animation
  const searchBarRef = useRef(null);
  const isSearchBarInView = useInView(searchBarRef, {
    once: false,
    amount: 0.5
  });

  return (
    <header>
      <Link to="/"><img loading="eager" fetchpriority="high" src={process.env.PUBLIC_URL + "/img/logo.png"} alt="Silver K Gallery" /></Link>

      {/* Links */}
      <nav className="pc">
        <Link to="/" className={location.pathname === "/" ? "selected" : ""}>Home</Link>
        <Link to="/collection" className={location.pathname.includes("/collection") ? "selected" : ""}>Our Collection</Link>
        <Link to="/exhibitions" className={location.pathname === "/exhibitions" ? "selected" : ""}>Exhibitions</Link>
        <Link to="/contactus" className={location.pathname === "/contactus" ? "selected" : ""} >Contact Us</Link>

        <SearchIcon classname="header-search-icon" size={24} onClick={() => { searchBarOpen ? setSearchBarOpen(false) : setSearchBarOpen(true) }}/> 
        <button title="Menu" tabIndex={0} aria-label="Menu button" onClick={() => {mobileMenuOpen ? setMobileMenuOpen(false) : setMobileMenuOpen(true)}}><div role="button" className={mobileMenuOpen ? "open" : undefined}></div></button>
      </nav>

      {/* The mobile menu */}
      <motion.nav
      ref={mobileNavRef}
      initial={{ opacity: 0, height: 0 }}
      animate={isMobileMenuInView ? { opacity: 1, height: "fit-content"} : {opacity: 0, height: 0}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
      className="mobile" style={{ display: mobileMenuOpen ? "flex" : "none"}}>
        <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={isMobileMenuInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100}}
        transition={{ duration: 0.2, ease:[0.16, 1, 0.3, 1]}}
        ><Link to="/" onClick={() => { setMobileMenuOpen(false); }} >Home</Link></motion.div>
        <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={isMobileMenuInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100}}
        transition={{ duration: 0.2, ease:[0.16, 1, 0.3, 1], delay: 0.05}}
        ><Link to="/collection" onClick={() => { setMobileMenuOpen(false); }}>Our Collection</Link></motion.div>
        <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={isMobileMenuInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100}}
        transition={{ duration: 0.2, ease:[0.16, 1, 0.3, 1], delay: 0.1}}
        ><Link to="/exhibitions" onClick={() => { setMobileMenuOpen(false); }}>Exhibitions</Link></motion.div>
        <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={isMobileMenuInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100}}
        transition={{ duration: 0.2, ease:[0.16, 1, 0.3, 1], delay: 0.15}}
        > <Link to="/contactus" onClick={() => { setMobileMenuOpen(false); }}>Contact Us</Link></motion.div>
        
        
        
        <motion.details
        initial={{ opacity: 0, x: -100 }}
        animate={isMobileMenuInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100}}
        transition={{ duration: 0.2, ease:[0.16, 1, 0.3, 1], delay: 0.2}}
        > 
          <summary><span>Animation</span></summary>

          <section>
            {Object.keys(data.animation).map((value, index) => (
              index < 6 && (
                <Link to={`/collection/animation/${value}`} key={index}>{value.replaceAll("-", " ")}</Link>
              )
            ))}
          </section>
        
        
        </motion.details>
        <motion.details
        initial={{ opacity: 0, x: -100 }}
        animate={isMobileMenuInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100}}
        transition={{ duration: 0.2, ease:[0.16, 1, 0.3, 1], delay: 0.2}}
        > 
          <summary><span>Photography</span></summary>

          <section>
            {Object.keys(data.photography).map((value, index) => (
              index < 6 && (
                <Link to={`/collection/photography/${value}`} key={index}>{value.replaceAll("-", " ")}</Link>
              )
            ))}
          </section>
        
        
        </motion.details>
      </motion.nav>

      {/* The search bar menu */}
      <motion.form
        ref={searchBarRef}
        initial={{opacity: 0}}
        animate={isSearchBarInView ? {opacity: 1} : { opacity: 0}}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
        className="searchbar"
        style={{ display: searchBarOpen ? "flex" : "none"}}
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          searchSubmit(navigate, searchRef.current.value);
        }}
      >
        <div className="input">
          <SearchIcon classname={"icon"} size={22} onClick={() => {navigate(`/collection?search=${searchRef.current.value.trim()}`); setSearchBarOpen(false); }} />

          <input ref={searchRef} placeholder="Search..." name="search" autoComplete="off" autoCapitalize="off" />

          <button type="button" onClick={() => { setSearchBarOpen(false) }} className="close"></button>


        </div>

        {/* only will be shown on desktop mode cos it will be too big for on mobile */}
        <div className="seperatelinks">
          <DetailsComponent data={data} />
        </div>
      
      </motion.form>
    </header>
  );
}