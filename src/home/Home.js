import { Link } from "react-router-dom";
import "./home.css";
import { Card } from "../global/modules";
import { motion, useInView } from 'framer-motion';
import { useRef } from "react";


// get rid of this once we move it to the real site
const initialLINK = "/silverkgallery";

// The special cards for the themes
const SpecialCard = ({ url="", src, logosrc, fromleft, externalLink="", styling = {}, delay = 0, logoStyling = {}}) => {
  const motionReference = useRef(null);
  const isInView = useInView(motionReference, { once: true });

  return (
    <motion.a
      ref={motionReference}
      initial={{ opacity: 0, x: (fromleft ? -100 : 100)}}
      animate={isInView ? { opacity: 1, x: 0} : { opacity: 0, x: (fromleft ? -100 : 100)}}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: delay
      }}
      target="_blank"
      href={externalLink === "" ? initialLINK + "/collection" + url : externalLink}
    >
      <figure>
        <img loading="eager" fetchpriority="high" src={process.env.PUBLIC_URL + `/img` + src} alt="Theme" style={styling}/>
      </figure>

      <figcaption>
        <img src={process.env.PUBLIC_URL + "/img" + logosrc} draggable="false" style={logoStyling} alt="Theme Name" />

        <p>Find more</p>
      </figcaption>
    </motion.a>
  );
}


export default function Home () {
  // Setting up the scrolling animations
  const powfigureRef = useRef(null);
  const figcaptionRef = useRef(null);
  const isInView = useInView(powfigureRef, { once: true});
  const isTextInView = useInView(figcaptionRef, { once: true });
  const historyRef = useRef(null);
  const isHistoryInView = useInView(historyRef, {once: true }); 
  const mobileMainRef = useRef(null);
  const isMobileMainInView = useInView(mobileMainRef, { once: true });

  return (
    <>
      <section className="main">
        <figure>
          <img loading="eager" fetchpriority="high" src={process.env.PUBLIC_URL + "/img/home_image.jpg"} alt="Ronnie Woods Art" draggable={false}/>
          
          {/* For the text on the right */}
          <figcaption>
            <h1><span className="h1-one">discover </span><span className="h1-two">timeless </span><span className="h1-three"> artwork</span></h1>
            <h2>Silver K Gallery - Celebrating 40 years of Artistic Innovation</h2>

            <Link to={"/collection"}>Explore our collection</Link>
          </figcaption>
        </figure>
      </section>


      {/* We need to fix the mobile main bit */}

      <section className="mobile-main" ref={mobileMainRef}>
        <img src={process.env.PUBLIC_URL + "/img/home_image.jpg"} alt="Ronnie Woods Art" draggable={false}/>

        <div className="text">
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
              animate={isMobileMainInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0 // 0.2 second delay
              }}
          
          >
            Discover
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
              animate={isMobileMainInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0.1 // 0.2 second delay
              }}
          
          >
            Timeless
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
              animate={isMobileMainInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0.2 // 0.2 second delay
              }}
          
          >
            Artwork
          </motion.h1>


          <motion.p
             initial={{ opacity: 0, x: -100 }}
             animate={isMobileMainInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
             transition={{ 
               duration: 0.5, 
               ease: [0.16, 1, 0.3, 1], // cubic-bezier
               delay: 0.3 // 0.2 second delay
             }}
          >Silver K Gallery - Celebrating 40 years of Artistic Innovation</motion.p>
        
          <motion.div 
           initial={{ opacity: 0, y: 100 }}
           animate={isMobileMainInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
           transition={{ 
             duration: 0.5, 
             ease: [0.16, 1, 0.3, 1], // cubic-bezier
             delay: 0.35 // 0.2 second delay
           }}
           style={{ marginTop: "70px"}}
           >
              <Link to={"/collection"}>Explore our collection</Link>
           </motion.div>
        </div>

      </section>

      {/* The cards for the themes */}
      {/* Animatiin */}
      <section className="cards" style={{ paddingBottom: "10px"}}>
        <h2>Animation</h2>

        {/* Row of the special cards */}
        <div className="theme-row">
          <SpecialCard url={"/animation/marvel"} src={"/animation/marvel/spidermen.jpg"} logosrc={"/animation/marvel/marvelogo.png"} fromleft={true} delay={0.2}/>
          <SpecialCard url={"/animation/dc-comics"} src={"/animation/dc-comics/batman1000.webp"} logosrc={"/animation/dc-comics/logo.png"} styling={{ marginLeft: "-280px"}} fromleft={true} logoStyling={{ width: "45%", marginBottom: "-20px", marginTop: "-20px"}} />
          <SpecialCard url={"/animation/star-wars"} src={"/animation/star-wars/whatremains.jpg"} logosrc={"/animation/star-wars/swlogo.png"} styling={{ marginLeft: "-25px"}} fromleft={false} logoStyling={{ marginTop: "-10px"}} />
          <SpecialCard url={"/animation/disney"} src={"/animation/disney/celebratethemouse.gif"} logosrc={"/animation/disney/disneylogo.svg"} fromleft={false} delay={0.2} logoStyling={{ maxHeight: "150px", marginBottom: "-35px", marginTop: "-20px"}}/>
        </div>
        
        {/* Mobile theme row */}
        <div className="mobile-theme-row">
          <Link to={"/collection/animation/marvel"}><img loading="eager" fetchpriority="high" src={process.env.PUBLIC_URL + "/img/animation/marvel/marvelogo.png"} alt="Marvel" title="Marvel"/></Link>
          <Link to={"/collection/animation/dc-comics"}><img loading="eager" fetchpriority="high" src={process.env.PUBLIC_URL + "/img/animation/dc-comics/logo.png"} alt="Simpsons" title="Simpsons"/></Link>
          <Link to={"/collection/animation/star-wars"}><img loading="eager" fetchpriority="high" src={process.env.PUBLIC_URL + "/img/animation/star-wars/swlogo.png"} alt="Star Wars" title="Star Wars" /></Link>
          <Link to={"/collection/animation/disney"}><img loading="eager" fetchpriority="high" style={{ marginTop: "10px"}} className="disney" title="disney" src={process.env.PUBLIC_URL + "/img/animation/disney/dislogoblack.svg"} alt="Disney"/></Link>
        </div>

        <Link className="featured" to={"/collection/animation/?featured=1+0"}>See the featured items...</Link>
      </section>

      {/* Photography */}
      <section className="cards beneath" style={{ paddingTop: "0px", paddingBottom: "0px"}}>
        <h2 className="desktop">Rock N' Roll Photography</h2>
        <h2 className="mobile">Photography</h2>

        {/* Row of the special cards */}
        <div className="theme-row">
          <SpecialCard externalLink={"https://silverkgallery.com.au/rock-n-roll-photography/the-beatles/dezo-hoffman-photographs/"} src={"/photography/the-beatles/beatles_background.webp"} styling={{ marginLeft: "0px", width: "250px", height: "550px", marginTop: "-40px"}} logosrc={"/photography/the-beatles/beatles.png"} fromleft={true} delay={0.2}/>
          <SpecialCard externalLink={"https://silverkgallery.com.au/rock-n-roll-photography/marilyn-monroe/"} logosrc={"/photography/marilyn-monroe/logo.png"} src={"/photography/marilyn-monroe/background.webp"} fromleft={true} />
          <SpecialCard externalLink={"https://silverkgallery.com.au/rock-n-roll-photography/the-rolling-stones/"} logosrc={"/photography/rolling-stones/logo.webp"} src={"/photography/rolling-stones/rollingstones_band.jpeg"} fromleft={false} logoStyling={{ width: "110%", marginBottom: "35px" }} styling={{ marginLeft: "-80px", height: "105%", marginTop: "-10px"}} />
          <SpecialCard externalLink={"https://silverkgallery.com.au/rock-n-roll-photography/ronnie-woods-art/"} logosrc={"/photography/ronnie-woods/logo.png"} src={"/photography/ronnie-woods/background.jpg"} fromleft={false} delay={.2} styling={{ height: "115%"}} />
        </div>

        {/* Mobile version of above */}
        <div className="mobile-theme-row">
          <a target="_blank" href={"https://silverkgallery.com.au/rock-n-roll-photography/the-beatles/dezo-hoffman-photographs/"}>
            <img loading="eager" fetchpriority="high" src={process.env.PUBLIC_URL + "/img/photography/the-beatles/beatles-mobile.png"} alt="The Beatles" title="The Beatles" />
          </a>

          <a target="_blank" href={"https://silverkgallery.com.au/rock-n-roll-photography/marilyn-monroe/"}>
            <img loading="eager" fetchpriority="high" style={{ transform: "scale(1.2)"}} src={process.env.PUBLIC_URL + "/img/photography/marilyn-monroe/logo-mobile.png"} alt="Marilyn Monroe" title="Marilyn Monroe" />
          </a>
          <a target="_blank" href={"https://silverkgallery.com.au/rock-n-roll-photography/the-rolling-stones/"}>
            <img loading="eager" fetchpriority="high" src={process.env.PUBLIC_URL + "/img/photography/rolling-stones/logo-red.png"} alt="Rolling Stones" title="Rolling Stones" />
          </a>
          <a target="_blank" href={"https://silverkgallery.com.au/rock-n-roll-photography/ronnie-woods-art/"}>
            <img loading="eager" fetchpriority="high" style={{ transform: "scale(0.9)"}} src={process.env.PUBLIC_URL + "/img/photography/ronnie-woods/logo.avif"} alt="Ronnie Woods" title="Ronnie Woods" />
          </a>
        </div>

        <Link className="featured" to={"/collection/photography/?featured=0+1"}>See the featured items...</Link>

      </section>

      {/* Add a click on bit to take to the featured item */}
       {/* Piece of the week goes before history */}
       <section className="pow">
        <figure ref={powfigureRef}>
          <figcaption ref={figcaptionRef}>
            <h3>Piece of the Month</h3>
            <motion.h2 
              initial={{ opacity: 0, y: 100 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0 // 0.2 second delay
              }}
            >
              The Engine of Imagination
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 100 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0.2 
              }}
            >
              Walt Disney had a long fascination with trains.
His father and an uncle had spent time working on railroads, and as a teen in Kansas City Walt did a brief stint selling newspapers and snacks on trains.  Later, Walt constructed elaborate model train sets as a way to unwind from the stress of his job. In the late 1940s, he built himself a one-eighth-scale steam locomotive, and after moving into a new home in the Holmby Hills section of Los Angeles in 1950 he laid half a mile of tracks around the property for his railroad. He would dress up in a train engineer’s clothing and give visitors rides on his Carolwood Pacific Railroad, named for the street he lived on.
His passion for trains is reflected at Disneyland, which has been home to its own railroad since opening in 1955.
            </motion.p>
          </figcaption>
          <div className="gap"></div>
          <motion.img 
           draggable={false}
           initial={{ opacity: 0.1 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0.1 }}
            transition={{ 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1], // cubic-bezier
            }}
            decoding="async"
            loading="lazy"
           src={process.env.PUBLIC_URL + "/img/engineofimagination.jpg"} alt="Piece of the week" />
        </figure>
      </section>


      {/* Have an our history part on the history of silver k gallery */}
      <section className="history">
        
        <figure>
          <motion.img 
          initial={ { opacity: 0, x: -200, display: "none" } }
          animate={isHistoryInView ? { opacity: 1, x: 0, display: "flex" } : { opacity: 0, x: -200, display: "none" }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0
          }}
          loading="eager"
          src={process.env.PUBLIC_URL + "/img/col_sitting.jpg"} draggable={false} />
          <figcaption>Silver K Gallery's Owner: 

            <a href="tel:0395095577">Colin Kaye</a>
          </figcaption>
        </figure>
        
        <div className="info">
          {/* Title */}
          <h2>Silver K's History</h2>

        {/* List of history */}
          <div className="inline">
            {/* The numberiong */}
            <ol>
              <li className="order">1</li>
              <li className="order">2</li>
              <li className="order">3</li>

            </ol>

            {/* For the text */}
            <ul>
              {/* Start of history */}
              <motion.li
                initial={{ opacity: 0, y: 100}}
                animate={isHistoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100}}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0
                }}
              >
                <h4>Set up shop (1980)</h4>
                
                <p>Silver K Gallery was created to present art in Australia that had never been previously seen in this country</p>

              </motion.li>

              <motion.li 
                initial={{ opacity: 0, y: 100}}
                animate={isHistoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100}}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.15
                }}

              ref={historyRef}>
                <h4>6 Galleries Across Australia (1995)</h4>
                
                <p>At the peak of the companies expansion, we had a gallery in every capital, and one in the US</p>

              </motion.li>

              <motion.li 
                initial={{ opacity: 0, y: 100}}
                animate={isHistoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100}}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3
                }}

              >
                <h4>Today</h4>
                
                <p>We have our original gallery in  <a href="https://www.google.com/maps/place/Silver+K+Gallery/@-37.8559802,145.023579,655m/data=!3m2!1e3!4b1!4m6!3m5!1s0x6ad669de9a472a79:0x4d8a0c22ab0f2f3b!8m2!3d-37.8559802!4d145.023579!16s%2Fg%2F1v9gvm0b?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D">High St, Armadale</a>, specialising in animation art and rock n' roll photography</p>

              </motion.li>
            </ul>
          </div>
        
        </div>

      </section>


      <section className="quote">
        <h2>
          
          <div className="first"></div>
          <div className="firstB"></div>
          
          Showing the best in <i>Animation</i> and <i>Rock and Roll Photography</i><span>...</span>
       
          <div className="last"></div>
          <div className="lastB"></div>
          </h2>
      </section>

      
      {/* For the featured items of each */}
      <section className="cards bottom-cards">
        <h3>Featured Animation Artwork</h3>

        <div className="card-grid">
          <Card id={"animation/marvel/spidermen"} />
          <Card id={"animation/star-wars/feature-films/whatremains"} />
          <Card id={"animation/marvel/thetruthis"} />
          <Card id={"animation/star-wars/feature-films/youweremybrother"} />
          <Card id={"animation/star-wars/feature-films/trenchrun2"} />
          <Card id={"animation/disney/assorted-characters/happilyeverafter"} />
          <Card id={"animation/star-wars/feature-films/deepinbongo"} />
          <Card id={"animation/star-wars/feature-films/waysoftheforce"} />
        </div>

        <Link className="visible" to={"/collection/animation/?featured=1+0"}>See more featured animation...</Link>

      </section>

      {/* Photography */}
      <section className="cards bottom-cards" style={{ paddingTop: "0px"}}>
        <h3>Featured Rock N' Roll Photography</h3>
        
        {/* Need to add the cards in here */}
        <div className="card-grid">
          <Card id={"photography/misc/thegoodclinteastwood"} styles={{ marginRight: "-300px"}}/>
          <Card id={"photography/marilyn-monroe/flowinmouth"} />
          <Card id={"photography/rolling-stones/rollinstones"} />
          <Card id={"photography/ronnie-woods/slideonthis"} />
          <Card id={"photography/marilyn-monroe/outthewindow"} />
          <Card id={"photography/ronnie-woods/conversation11"} />
          <Card id={"photography/the-beatles/paulmccartney"} />
          <Card id={"photography/the-beatles/johnglasses"} />
        </div>

        <Link className="visible" to={"/collection/photography/?featured=0+1"}>See more featured photography...</Link>

      </section>
    </>
  );
}