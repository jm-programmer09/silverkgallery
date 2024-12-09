import "./card.css";
import { Link } from "react-router-dom";
import data from "../products.json";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// For the search icon
export function SearchIcon ({ classname, size = 24, onClick=null }) {
  return (
    <svg className={classname} onClick={onClick} height={size} width={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  );
}

// Make a function in here so that when it is given the size of the image, if there is no direct size, then state the edition size
export function sizeParser (dimensions) { // dimensions === data.__item__.dimensions
  // This is for if there are dimensions in inches
  if (typeof dimensions[0] === "object") {
    return (
      // For if there are multiple dimensions
      (typeof dimensions[0][0] === "object" ?
        dimensions[0].map((dimension, index) => (
          <span key={index}>{dimension[0]}" x {dimension[1]}"&ensp;</span>
        )) 
        : <span>{dimensions[0][0]}" x {dimensions[0][1]}"</span> 
      )
    );
  } 
  // Else for the cards that have no initial specific dimension, then check for other sizes
  for (let index = 1; index < dimensions.length; index++) {
    const current_edition = dimensions[index];

    if (current_edition !== 0) {
      let title_index;

      switch (index) {
        case 2:
          title_index = "Paper Edition Size: ";
          break;
        case 3:
          title_index = "Glicee Edition Size: ";
          break;
        case 4:
          title_index = "Canvas Edition Size: ";
          break;
        default:
          title_index = "Edition Size: ";
      }

      return (
        <span>{title_index} {current_edition}</span>
      );
    }
  }

  // If it fails to have an edition size just dont say anything or you can add a return here that says 'no specfied size'
}

// The card design
export function Card ({ id, styles={}}) {
  // For adding the cool animation
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true });
  const element = data[id.split("/")[0]][id.split("/")[1]][id.split("/")[2]];
  
  if (element === undefined) {
    console.log(id);
  }

  return (
    <motion.div 
      initial={{ opacity: 0.1 }}
      animate={cardInView ? {opacity: 1 } : { opacity: 0}}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.random() * 0.2
      }}
    >
    <Link to={"/collection/" + id} className="global-card">
      <div className="imgP"  style={styles}     ref={cardRef}>
        <img  decoding="async" loading="lazy"
 src={process.env.PUBLIC_URL + "/img/" + (id.split("/")[0] + "/" + id.split("/")[1]) + element.image} alt={id.split("/")[2]}  />
      </div>

      <div className="text">
        <h4>{element.title}</h4>
        <small>{sizeParser(element.dimensions)}</small>
        <p>{element.type}</p>
      </div>
    </Link>
    </motion.div>
  );
}


// This is for the button if the user has scrolled down far 
export function ScrollButton () {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollButtonRef = useRef(null);
  const buttonInView = useInView(scrollButtonRef, { once: false });

  // checking the scroll
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  // make it come in on a motion animation

  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={buttonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30}}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }}
      ref={scrollButtonRef} onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) }}  className="scroll-button" style={{ display: scrollPosition > 2000 ? "flex" : "none"}} >
        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M12 5L6 11M12 5L18 11" stroke="#003399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </>
  )
}