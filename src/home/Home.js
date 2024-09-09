import { Link } from "react-router-dom";
import "./home.css";
import { motion, useInView } from 'framer-motion';
import { useRef } from "react";

// The special cards for the themes
const SpecialCard = ({ url, src, logosrc, fromleft, styling = {}, delay = 0}) => {
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
      href={"/collection" + url}
    >
      <figure>
        <img src={`/img` + src} alt="Theme" style={styling}/>
      </figure>

      <figcaption>
        <img src={"/img" + logosrc} draggable="false" alt="Theme Name" />

        <p>Find more</p>
      </figcaption>
    </motion.a>
  );
}


export default function Home () {
  // Setting up the scrolling animations
  const powh2Ref = useRef(null);
  const powpRef = useRef(null);
  const powimgRef = useRef(null);
  const isInView = useInView(powpRef, { once: true});

  return (
    <>
      <section className="main">
        <figure>
          <img src="/img/ronniewoods.jpg" alt="Ronnie Woods Art" draggable={false}/>
          
          {/* For the text on the right */}
          <figcaption>
            <h1><span className="h1-one">discover </span><span className="h1-two">timeless </span><span className="h1-three"> animatography</span></h1>
            <h2>Silver K Gallery - Celebrating 40 years of Artistic Innovation</h2>

            <Link to={"/collection"}>Explore our collection</Link>
          </figcaption>
        </figure>
      </section>
  
      <section className="pow">
        <figure>
          <figcaption>
            <h3>Piece of the Month</h3>
            <motion.h2 
              ref={powh2Ref} 
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0 // 0.2 second delay
              }}
            >
              The Engine of Imagination
            </motion.h2>
            <motion.p
              ref={powpRef} 
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
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
          
          <motion.img 
           ref={powimgRef} 
           draggable={false}
           initial={{ opacity: 0.1 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0.1 }}
            transition={{ 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1], // cubic-bezier
            }}
           src="/img/engineofimagination.jpg" alt="Piece of the week" />
        </figure>
      </section>

      {/* The cards for the themes */}
      {/* Animatiin */}
      <section className="cards">
        <h2>Animation</h2>

        {/* Row of the special cards */}
        <div className="theme-row">
          <SpecialCard url={"/animation/marvel"} src={"/animation/marvel/spidermen.jpg"} logosrc={"/animation/marvel/marvelogo.png"} fromleft={true} delay={0.2}/>
          <SpecialCard url={"/animation/simpsons"} src={"/animation/simpsons/tatumvssimpson.gif"} logosrc={"/animation/simpsons/simpsonslogo.png"} styling={{ marginLeft: "-80px"}} fromleft={true} />
          <SpecialCard url={"/animation/star-wars"} src={"/animation/star-wars/whatremains.jpg"} logosrc={"/animation/star-wars/swlogo.png"} styling={{ marginLeft: "-25px"}} fromleft={false} />
          <SpecialCard url={"/animation/disney"} src={"/animation/disney/celebratethemouse.gif"} logosrc={"/animation/disney/disneylogo.svg"} fromleft={false} delay={0.2}/>
        </div>
      </section>

      {/* Photography */}
      <section className="cards">

      </section>
    </>
  );
}
