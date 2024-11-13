import "./contact.css";
import React, { useRef } from "react";
import { motion, useInView } from 'framer-motion';


export default function ContactUs () {
  const motionReference = useRef(null);
  const isTextInView = useInView(motionReference, { once: false});

  return (
    <>
      {/* Have line boxes around the text of the images */}
      <div className="contact_us">
        <div className="left" ref={motionReference}>
          <h1>
            <motion.div 
            ref={motionReference}
            initial={{ opacity: 0, x: -100 }}
              animate={isTextInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0 
              }}
            
            >Any</motion.div>
            <motion.div 
            ref={motionReference}
            initial={{ opacity: 0, x: -100 }}
              animate={isTextInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0.2 
              }}
            
            >Questions?</motion.div>
          </h1>


          <motion.h3
          ref={motionReference}
            initial={{ opacity: 0, y: 100 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0.2
              }}
          
          >find the right answer to your question easily.</motion.h3>

          <motion.h3
          ref={motionReference}
            initial={{ opacity: 0, y: 100 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0.3
              }}
          
          >Just give us a ring!</motion.h3>


          {/* Add icons before these links */}

          <motion.div
          ref={motionReference}
            initial={{ opacity: 0 }}
              animate={isTextInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0.5
              }}
          
          className="link" style={{ marginTop: "50px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000"  viewBox="0 0 1920 1920">
                <path d="M1920 428.266v1189.54l-464.16-580.146-88.203 70.585 468.679 585.904H83.684l468.679-585.904-88.202-70.585L0 1617.805V428.265l959.944 832.441L1920 428.266ZM1919.932 226v52.627l-959.943 832.44L.045 278.628V226h1919.887Z" fill-rule="evenodd"/>
            </svg>

            <a  href="mailto:colin@silverkgallery.com.au">colin@silverkgallery.com.au</a>
          </motion.div>

          <motion.div
          ref={motionReference}
            initial={{ opacity: 0 }}
              animate={isTextInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0.5
              }}
          
          className="link">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none">
              <path d="M2.00589 4.54166C1.905 3.11236 3.11531 2 4.54522 2H7.60606C8.34006 2 9.00207 2.44226 9.28438 3.1212L10.5643 6.19946C10.8761 6.94932 10.6548 7.81544 10.0218 8.32292L9.22394 8.96254C8.86788 9.24798 8.74683 9.74018 8.95794 10.1448C10.0429 12.2241 11.6464 13.9888 13.5964 15.2667C14.008 15.5364 14.5517 15.4291 14.8588 15.0445L15.6902 14.003C16.1966 13.3687 17.0609 13.147 17.8092 13.4594L20.8811 14.742C21.5587 15.0249 22 15.6883 22 16.4238V19.5C22 20.9329 20.8489 22.0955 19.4226 21.9941C10.3021 21.3452 2.65247 13.7017 2.00589 4.54166Z" fill="black"/>
            </svg>

            <a href="tel:(03)95095577">(03) 9509-5577</a>

          </motion.div>
        </div>


        {/* Includes the gallery bit */}
        <motion.div
        ref={motionReference}
        initial={{ opacity: 0, x: 100 }}
          animate={isTextInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ 
            duration: 1, 
            ease: [0.16, 1, 0.3, 1], // cubic-bezier
            delay: 0
          }}
        
        
        className="right">

          {/* this includes the images and stuff */}
          <div className="panel">

            {/* The text that goes over the images */}
            <p className="text">
              <h2>Let's talk.</h2>

              <small>Share your excitement with us.</small>


              {/* Add an arrow in here for the links */}
              <div className="link-row">
                <a href="mailto:colin@silverkgallery.com.au">Email</a>
                <a href="tel:(03)95095577">Call</a>
              </div>

            </p>

            {/* The parent of the images being held */}
            <div className="images">
              <div className="top-row">
                <img loading="eager" fetchPriority="high" alt="Wandering Jedi panel"  src={process.env.PUBLIC_URL + "/img/contact/wanderjedi.png"} />
                <img loading="eager" fetchPriority="high" alt="The flintstones panel" src={process.env.PUBLIC_URL + "/img/contact/fred-harp.gif"} />
              </div>
              
              <img loading="eager" fetchPriority="high" alt="Firefly panel" className="bottom"  src={process.env.PUBLIC_URL + "/img/contact/firefly.png"} />

            </div>
          </div>

        </motion.div>

      </div>

    </>
  );
}