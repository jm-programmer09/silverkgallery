import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { sizeParser } from "../global/modules";
import data from "../products.json";


export function shuffleArray(array) {
  // Create a copy of the original array
  const shuffled = [...array];
  
  // Start from the last element and swap one by one
  for (let i = shuffled.length - 1; i > 0; i--) {
      // Pick a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      
      // Swap elements at i and j
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

export function Item (  {  id  } ) {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true });

  // we will now have to check here for subcategories
  const element = id.split(".").length > 3 ? data[id.split(".")[0]][id.split(".")[1]][id.split(".")[2]][id.split(".")[3]][id.split(".")[4]] : data[id.split(".")[0]][id.split(".")[1]][id.split(".")[2]];

  // For error handling
  if (element === undefined) {
    console.log(id);
    console.log("The above is having an unexpected error with image render")
  }

  return (
    <motion.div 
      initial={{ opacity: 0.1 }}
      animate={cardInView ? {opacity: 1 } : { opacity: 0}}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.random() * 0.1
      }}
      style={{ width: "fit-content"}}
    >
    <Link to={id.split(".").length > 3 ? `/collection/${id.split(".")[0]}/${id.split(".")[1]}/${id.split(".")[3]}/${id.split(".")[4]}`      :  `/collection/${id.split(".")[0]}/${id.split(".")[1]}/${id.split(".")[2]}`} className="global-card collections-card">
      <div className="imgP"       ref={cardRef}>
        <img draggable="false" fetchpriority="high" loading="eager" style={{ userSelect: "none"}} src={element.image !== undefined && process.env.PUBLIC_URL + "/img/" + (id.split(".")[0] + "/" + id.split(".")[1]) + element.image} alt={id.split(".")[2]}  />
      </div>

      <div className="text">
        <h4>{element.title}</h4>
        <small>{sizeParser(element.dimensions)}</small>
        <p>{element.type === "Giclée on canvas and paper" ? "Giclée on canvas/paper" : element.type}</p>
      </div>
    </Link>
    </motion.div>
  );
}