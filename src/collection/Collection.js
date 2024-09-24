import { useState, useRef } from "react";
import "./collection.css";
import data from "../products.json";
import { motion } from 'framer-motion';
import { SearchIcon } from "../global/modules";

// When the nav bar has to go mobile, change it so that it becomes a button called 'filters' and that button then opens the same nav menu up but covering the whole screen
// when we move to using the url's of the page, change it so that the listopener has another parameter for whether it shows the menu or not

function MenuOpener({ title, data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ulRef = useRef(null);

  return (
    <>
      <h4 onClick={() => setMenuOpen(!menuOpen)}>
        {title}
        {menuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
            <path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" fill="#0F0F0F" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
            <path d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3Z" fill="#0F0F0F" />
          </svg>
        )}
      </h4>

      {menuOpen && (
        <motion.ul
          ref={ulRef}
          initial={{ opacity: 0, height: "0px" }}
          animate={menuOpen ? { opacity:1, height: "auto" } : { opacity:0, height: "0px" }}
          transition={{ duration: .2, ease: [0.16,1,0.3,1] }}
          className="theme-list"
        >
          {Object.keys(data[title]).map((theme_title, index) => {
            // Create a unique ID for each checkbox
            const uniqueId = `${title}-${theme_title}-${index}`;
            return (
              <li key={uniqueId}>
                <input type="checkbox" id={uniqueId} />
                <label htmlFor={uniqueId}> {theme_title.replace("-", " ")} </label>
              </li>
            );
          })}
        </motion.ul>
      )}
    </>
   );
}




export default function OurCollection () {
  return (
    <>
      <section className="searchbar">
        {/* We will have to update this H2 based on the search */}
        <h2>
          <span className="title">Gallery</span>
          <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" fill="rgb(130, 130, 130)" version="1.1" width="8px" height="8px" viewBox="0 0 103.536 103.536" >
          <g>
            <g>
              <path d="M0.65,91.928c1.221,2.701,3.881,4.3,6.665,4.3c1.006,0,2.029-0.209,3.006-0.65l88.917-40.195    c2.688-1.216,4.381-3.925,4.295-6.873c-0.085-2.948-1.934-5.554-4.687-6.609L9.929,7.794C6.17,6.352,1.933,8.23,0.489,12.001    c-1.447,3.769,0.438,7.995,4.207,9.44l72.569,27.834L4.299,82.255C0.62,83.92-1.012,88.249,0.65,91.928z"/>
            </g>
          </g>
          </svg>
          <span className="result">{"Results__HERE"}</span>
        </h2>

        {/* The search bar */}
        <form>
          <button type="submit"><SearchIcon size={24} classname={"searchicon"}/> </button>

          <input required="" type="text" className="search" name="search" autoComplete="off" placeholder="Search..."/>

        </form>
      </section>


      <section className="collection">
        {/* This is for the searching */}
        <nav>
          <h3>
            Filters

            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20M7 12H17M9 18H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </h3>
          {/* THis is for the photography and then animations */}
          <ul>
            {/* ANIMATION */}
            <li className="top">
              <MenuOpener title="animation" data={data}/>
            </li>
            
            {/* PHOTOGRAPY */}
            <li>
              <MenuOpener title="photography" data={data} />

            </li>

          </ul>
        </nav>
      </section>
    </>
  );
}