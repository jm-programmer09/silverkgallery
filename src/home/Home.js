import { Link } from "react-router-dom";
import "./home.css";
import { Card } from "../global/modules";
import { motion, useInView } from 'framer-motion';
import { useRef } from "react";


// get rid of this once we move it to the real site
const initialLINK = "/silverkgallery";

// The special cards for the themes
const SpecialCard = ({ url, src, logosrc, fromleft, styling = {}, delay = 0, logoStyling = {}}) => {
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
      href={initialLINK + "/collection" + url}
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

      <section className="mobile-main">

        <h1>Celebrating <big>40</big> years of artistic innovation...</h1>

        <img src={process.env.PUBLIC_URL + "/img/home_image.jpg"} alt="Ronnie Woods Art" draggable={false}/>

        <div className="row">
          <h2>
            <span>Discover</span>
            <span>Timeless</span>
            <span>Artwork</span>
          </h2>

          <Link to={"/collection"}>Explore our collection</Link>

        </div>

      </section>

      {/* The cards for the themes */}
      {/* Animatiin */}
      <section className="cards" style={{ paddingBottom: "10px"}}>
        <h2>Animation</h2>

        {/* Row of the special cards */}
        <div className="theme-row">
          <SpecialCard url={"/animation/marvel"} src={"/animation/marvel/spidermen.jpg"} logosrc={"/animation/marvel/marvelogo.png"} fromleft={true} delay={0.2}/>
          <SpecialCard url={"/animation/simpsons"} src={"/animation/simpsons/tatumvssimpson.gif"} logosrc={"/animation/simpsons/simpsonslogo.png"} styling={{ marginLeft: "-80px"}} fromleft={true} />
          <SpecialCard url={"/animation/star-wars"} src={"/animation/star-wars/whatremains.jpg"} logosrc={"/animation/star-wars/swlogo.png"} styling={{ marginLeft: "-25px"}} fromleft={false} />
          <SpecialCard url={"/animation/disney"} src={"/animation/disney/celebratethemouse.gif"} logosrc={"/animation/disney/disneylogo.svg"} fromleft={false} delay={0.2}/>
        </div>
        
        {/* Mobile theme row */}
        <div className="mobile-theme-row">
          <Link to={"/collection/animation/marvel"}><img loading="eager" fetchpriority="high" src={process.env.PUBLIC_URL + "/img/animation/marvel/marvelogo.png"} alt="Marvel" title="Marvel"/></Link>
          <Link to={"/collection/animation/simpsons"}><img loading="eager" fetchpriority="high" src={process.env.PUBLIC_URL + "/img/animation/simpsons/simpsonslogo.png"} alt="Simpsons" title="Simpsons"/></Link>
          <Link to={"/collection/animation/star-wars"}><img loading="eager" fetchpriority="high" src={process.env.PUBLIC_URL + "/img/animation/star-wars/swlogo.png"} alt="Star Wars" title="Star Wars" /></Link>
          <Link to={"/collection/animation/disney"}><img loading="eager" fetchpriority="high" style={{ marginTop: "10px"}} className="disney" title="disney" src={process.env.PUBLIC_URL + "/img/animation/disney/dislogoblack.svg"} alt="Disney"/></Link>
        </div>

        <Link className="featured" to={"/collection/animation/?featured=1+0"}>See the featured items...</Link>
      </section>

      {/* Photography */}
      <section className="cards" style={{ paddingTop: "0px", paddingBottom: "0px"}}>
        <h2>Rock N' Roll Photography</h2>

        {/* Row of the special cards */}
        <div className="theme-row">
          <SpecialCard url={"/photography/the-beatles"} src={"/photography/the-beatles/beatles_background.webp"} styling={{ marginLeft: "0px", width: "250px", height: "550px", marginTop: "-40px"}} logosrc={"/photography/the-beatles/beatles.png"} fromleft={true} delay={0.2}/>
          <SpecialCard url={"/photography/marylin-monroe"} logosrc={"/photography/marylin-monroe/logo.png"} src={"/photography/marylin-monroe/background.webp"} fromleft={true} />
          <SpecialCard url={"/photography/rolling-stones"} logosrc={"/photography/rolling-stones/logo.webp"} src={"/photography/rolling-stones/rollingstones_band.jpeg"} fromleft={false} logoStyling={{ width: "110%", marginBottom: "35px" }} styling={{ marginLeft: "-80px", height: "105%", marginTop: "-10px"}} />
          <SpecialCard url={"/photography/ronnie-woods"} logosrc={"/photography/ronnie-woods/logo.png"} src={"/photography/ronnie-woods/background.jpg"} fromleft={false} delay={.2} styling={{ height: "115%"}} />
        </div>

        {/* Mobile version of above */}
        <div className="mobile-theme-row">
          <Link to={"/collection/photography/the-beatles"}>
            <img loading="eager" fetchpriority="high" src={process.env.PUBLIC_URL + "/img/photography/the-beatles/beatles-mobile.png"} alt="The Beatles" title="The Beatles" />
          </Link>

          <Link to={"/collection/photography/marylin-monroe"}>
            <img loading="eager" fetchpriority="high" style={{ transform: "scale(1.2)"}} src={process.env.PUBLIC_URL + "/img/photography/marylin-monroe/logo-mobile.png"} alt="Marylin Monroe" title="Marylin Monroe" />
          </Link>
          <Link to={"/collection/photography/rolling-stones"}>
            <img loading="eager" fetchpriority="high" src={process.env.PUBLIC_URL + "/img/photography/rolling-stones/logo-red.png"} alt="Rolling Stones" title="Rolling Stones" />
          </Link>
          <Link to={"/collection/photography/ronnie-woods"}>
            <img loading="eager" fetchpriority="high" style={{ transform: "scale(0.9)"}} src={process.env.PUBLIC_URL + "/img/photography/ronnie-woods/logo.avif"} alt="Ronnie Woods" title="Ronnie Woods" />
          </Link>
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
          decoding="async" loading="lazy"
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
                initial={{ opacity: 0, x: 100}}
                animate={isHistoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100}}
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
                initial={{ opacity: 0, x: 100}}
                animate={isHistoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100}}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2
                }}

              ref={historyRef}>
                <h4>6 Galleries Across Australia (1995)</h4>
                
                <p>At the peak of the companies expansion, we had a gallery in every capital, and one in the US</p>

              </motion.li>

              <motion.li 
                initial={{ opacity: 0, x: 100}}
                animate={isHistoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100}}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.4
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
      <section className="cards">
        <h3>Featured Animation Artwork</h3>

        <div className="card-grid">
          <Card id={"animation/marvel/spidermen"} />
          <Card id={"animation/star-wars/whatremains"} />
          <Card id={"animation/marvel/thetruthis"} />
          <Card id={"animation/star-wars/youweremybrother"} />
          <Card id={"animation/simpsons/devilandhomer"} />
          <Card id={"animation/simpsons/heatwave"} />
          <Card id={"animation/marvel/directflight"} />
          <Card id={"animation/star-wars/waysoftheforce"} />
        </div>
      </section>

      {/* Photography */}
      <section className="cards" style={{ paddingTop: "0px"}}>
        <h3>Featured Rock N' Roll Photography</h3>
      </section>
    </>
  );
}