import "./contact.css";
import React, { useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { Link } from "react-router-dom";


export default function ContactUs () {
  const motionReference = useRef(null);
  const isTextInView = useInView(motionReference, { once: true });


  return (
    <>
      {/* Have line boxes around the text of the images */}
      <div className="contact_us" ref={motionReference}>
        <div className="left">
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


          <motion.h2
          ref={motionReference}
            initial={{ opacity: 0, y: 100 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0.2
              }}
          
          >find the right answer to your question easily.</motion.h2>

          <motion.h2
          ref={motionReference}
            initial={{ opacity: 0, y: 100 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1], // cubic-bezier
                delay: 0.3
              }}
          
          >Just give us a ring!</motion.h2>


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
            <svg style={{ marginBottom: "-3px"}} xmlns="http://www.w3.org/2000/svg" fill="#000000"  viewBox="0 0 1920 1920">
                <path d="M1920 428.266v1189.54l-464.16-580.146-88.203 70.585 468.679 585.904H83.684l468.679-585.904-88.202-70.585L0 1617.805V428.265l959.944 832.441L1920 428.266ZM1919.932 226v52.627l-959.943 832.44L.045 278.628V226h1919.887Z" fillRule="evenodd"/>
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
            <div className="text">
              <h2>Let's talk.</h2>

              <small>We'd love to hear from you!</small>

              <form>
                <input name="email" type="email" className="email" placeholder="Your email..." autoComplete="false" autoCapitalize="false" />
                <textarea name="message" placeholder="Your message..."></textarea>
                <button type="submit">Send Message</button>
              </form>

            </div>

            {/* The parent of the images being held */}
            <div className="images">
              <div className="top-row">
                <img loading="eager" fetchpriority="high" alt="Wandering Jedi panel"  src={process.env.PUBLIC_URL + "/img/contact/wanderjedi.png"} />
                <img loading="eager" fetchpriority="high" alt="The flintstones panel" src={process.env.PUBLIC_URL + "/img/contact/fred-harp.gif"} />
              </div>
              
              <img loading="eager" fetchpriority="high" alt="Firefly panel" className="bottom"  src={process.env.PUBLIC_URL + "/img/contact/firefly.png"} />

            </div>
          </div>

        </motion.div>

      </div>
      
      {/* Includes the map and then the title and info on the right */}
      <div className="contactlocation">
        <div className="left">
          {/* the map will go here */}
          <iframe title="Silver K Gallery Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2850.752703695991!2d145.02140925924053!3d-37.855978293385235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad669de9a472a79%3A0x4d8a0c22ab0f2f3b!2sSilver%20K%20Gallery!5e1!3m2!1sen!2sau!4v1732527434433!5m2!1sen!2sau" width="500" height="350" style={{ border: 0}} allowFullScreen={false} loading="eager" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <div className="right">
          {/* Text here */}
          <h2>Where to find us...</h2>

          <p>Silver K Gallery is located at <a href="https://www.google.com/maps/place/Silver+K+Gallery/@-37.8559802,145.023579,15z/data=!4m2!3m1!1s0x0:0x4d8a0c22ab0f2f3b?sa=X&ved=1t:2428&ictx=111">1092 High St, Armadale</a> where the finest animation and photography artwork lie. </p>
          
          <Link to="/collection">Explore Our Collection</Link>

        </div>


      </div>
    </>
  );
}