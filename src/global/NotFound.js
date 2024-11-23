import "./notfound.css";
import { Link } from "react-router-dom";
import { motion, useInView} from 'framer-motion';
import { useRef } from "react";

export default function NotFound () {
  const notfoundRef = useRef(null);
  const isTextInView = useInView(notfoundRef, {once: true });

  return (
    <>
      <section className="notfound" ref={notfoundRef}>
        <div className="text">
          <motion.h1
          initial={{ opacity: 0 }}
              animate={isTextInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0
              }}
          
          >Oops! The page you were looking for doesn't exist</motion.h1>
          <motion.p
          initial={{ opacity: 0 }}
              animate={isTextInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0.1
              }}
          
          >You may have misstyped the address or the page may have moved.</motion.p>
          
          <motion.h4
          initial={{ opacity: 0 }}
              animate={isTextInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0.2
              }}
          
          >Find what you are looking for...</motion.h4>

          <Link to={"/collection"}>
              See Our Collection
          </Link>

          {/* Have an after image of an arrow pointing to the button */}
     
        </div>

        <div className="image">
          <motion.img
          initial={{ opacity: 0, x: 100 }}
          animate={isTextInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ 
            duration: 1, 
            ease: [0.16, 1, 0.3, 1], // cubic-bezier
          }}
          draggable="false"
          width={500} loading="eager" src={process.env.PUBLIC_URL + "/img/notfound_image.gif"} />
          {/* You even have bugs bunny bamboozled */}
        
        </div>


      </section>
    </>
  );
}

// have a browse our collection button - make this look like the main button on the home page
// have a contact us button link - make this look like the main button being hovered on the home page