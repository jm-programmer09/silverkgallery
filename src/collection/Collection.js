import { useState, useEffect } from "react";
import "./collection.css";
import data from "../products.json";
import { motion } from "framer-motion";
import { SearchIcon } from "../global/modules";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Item, shuffleArray } from "./Item";

// End of imports

// function for searching through data.json for suitable results
// this is a linear search function
function searchJSON(data, searchTerm, selectorMap, featured, categories, themes) {
  // Once there are more than 50 results then we will have a button to load more
  const searchterm = searchTerm.toLowerCase(); 
  const results = [];


  // see whether the .some function works well
  (categories.length === 0 ? Object.keys(data) : categories).forEach(category => {
    // Check if it is featured in here as well
    (themes.length === 0 ? Object.keys(data[category]) : themes).forEach(theme => {
      // this is looping through the themes
      // the themes.length === 0 blah is so that if the function is on 'all' mode, it then checks through all themes - this goes the same for the categories 
      
      // Now iterating through the for loop
      Object.entries(data[category][theme]).forEach(([productID, product]) => {
        // if it is featured
        if (featured.includes(1)) {
          if (product.featured && (featured[category === "animation" ? 0 : 1] === 1) ) results.push(`${category}.${theme}.${productID}`);

        } else {
          // this is for if it is not featured
          // use the some for goign through the tags
          if (product.title.toLowerCase().includes(searchterm)) results.push(`${category}.${theme}.${productID}`)
          else if (product.type.toLowerCase().includes(searchterm)) results.push(`${category}.${theme}.${productID}`)
          else if (product.tags.includes(searchTerm)) results.push(`${category}.${theme}.${productID}`);
        }

      });
    });

  });

  return results;
}




// For the menu
/**
 * @param {Object} category // the category of this checkbox section
 * @param {Object} selectorMap // map of what things are selected
 * @param {Array} featured // [0, 0] left side is for animation, right side is for photography
 * @params {Function} setSearchParams // function to change the url
 * @params {Array} themes // the themes that are selected
 * @returns {JSX.Element} // returns the JSX element for the menu
 */
// this function when having boxes checked only changes the url, does not do anything else
function MenuCheckBoxes ( { category, selectorMap, featured, setSearchParams, themes, navigate, categories, search } ) {  
  // the function for if the all button is checked on/off
  function allClicked (category) {
    // If there are no themes then just delete/add the category
    // if there are no themes then it is just a matter of deleting or adding the category 
    const endCategoryList = categories.includes(category) ? categories.filter(cat => cat !== category).join("+") : categories.concat(category).join("+");      
    let endThemeList = "";

    if (themes.length > 0) {
      // this is for if there are themes
      // we have to check fi the themes are in the categories list of themes, and if they are then we have to remove them, else just addd or delete the category from the category list

      Object.keys(data[category]).forEach(categoryThemes => {
        themes = themes.filter(theme => theme !== categoryThemes);
      });

      endThemeList = themes.join("+");
    }

    // changing the url now
    navigate(`/collection/${endCategoryList}/${endThemeList}/${search.length > 0 ? `?search=${search}` : ""}?featured=${featured.join("%2B")}`);
  } 
  
  // the function for featured
  // featured works
  function featuredClicked () {
    if (category === "animation") {
      setSearchParams({ featured: `${featured[0] === 1 ? "0" : "1"}+${featured[1]}` });
    } else {
      setSearchParams({ featured: `${featured[0]}+${featured[1] === 1 ? "0" : "1"}` });
    }
  }

  // For the themes
  function themeClicked (currentTheme) {
    // if the theme is already selected, then we want to remove it from the url
    // if the theme is not selected, then we want to add it to the url
    const endThemeList = themes.includes(currentTheme) ? themes.filter(theme => theme !== currentTheme).join("+") : themes.concat(currentTheme).join("+");
    const endCategoryList = categories.includes(category) ? categories.join("+") : categories.concat(category).join("+");

    console.log(endCategoryList);
    
    // changing the url now
    navigate(`/collection/${endCategoryList}/${endThemeList}/${search.length > 0 ? `?search=${search}` : ""}?featured=${featured.join("%2B")}`);
  }

  
  return (
    <>
      {/* All */}
      <li>
        <input type="checkbox" id={`${category}-all`} checked={selectorMap[category].all} onChange={() =>  {allClicked(category)}} />
        <label htmlFor={`${category}-all`}>All</label>
      </li>

      {/* Featured  */}
      <li>
        <input type="checkbox" id={`${category}-featured`} checked={category === "animation" ? ( featured[0] === 1 ? true : false ) : ( featured[1] === 1 ? true : false )} onChange={featuredClicked} />
        <label htmlFor={`${category}-featured`}>Featured</label>
      </li>

      {/* The rest of the themes */}
      {Object.keys(data[category]).map((theme, index) => {
        return (
          <li key={index}>
            <input type="checkbox" id={`${category}-${theme}-${index}`} checked={selectorMap[category][theme]} onChange={() => {themeClicked(theme)}} />
            <label htmlFor={`${category}-${theme}-${index}`}>{theme.replace("-", " ")}</label>
          </li>
        )
      })}
    </>
  )
} 


// MAIN
export default function OurCollection () {
  // Setting up hooks
  const { categories, themes } = useParams();
  // For getting the ?featured= and ?search= from the url
  const [searchParams, setSearchParams] = useSearchParams();
  // For changing the url without fully reloading the page (for when the user uses the menu)
  const navigate = useNavigate();

  // Getting the searchParams
  const featured = searchParams.get("featured") === null 
  ? [0, 0] 
  : searchParams.get("featured").split("+").map(Number);
  const searchQuery = searchParams.get("search") === null ? "" : String(searchParams.get("search"));

  // useState for the menus
  const [animationMenuOpen, setAnimationMenuOpen] = useState(true);
  const [animationMenu, setAnimationMenu] = useState(<></>);
  const [photographyMenuOpen, setPhotographyMenuOpen] = useState(true);
  const [photographyMenu, setPhotographyMenu] = useState(<></>);

  // for the retunred products
  const [products, setProducts] = useState([]);

  // Creating a map of which products are selected or not for the search
  // the selectorMap will be changed when things are selected from the menu
  // themes will be marked true if they are selected in the useEffect of window.location.href
  const selectorMap = Object.fromEntries(
    Object.keys(data).map(category => [
      category,
      Object.fromEntries(Object.keys(data[category]).map(theme => [theme, false]))
    ])
  );

  // Then adding the 'all' to the selectorMap
  Object.keys(selectorMap).forEach(category => selectorMap[category].all = false);
  // selector map looks like this:
  /*
  {
    animation: {
      marvel: false,
      otherStuff: false,
      etc
    }
  }

  */

  // This useEffect updates everytime the url text changes
  // the url will be updated when the buttons are clicked
  // this si where we update the selectorMap to highlight themes that are true or false
  // have it so that when the searchbar changes its input it just adds it to the searchbar
  useEffect(() => {
    const listedCategories = categories !== undefined ? categories.split("+") : []; // puts it into an array
    const listedThemes = themes !== undefined ? themes.split("+") : [];    

    // so if there are no themes we do not go through and check which to make true, instead just make them all false
    if (listedThemes.length > 0) {
        // for making themes true if they are in the url
      listedCategories.forEach(category => {
        listedThemes.forEach(theme => {
          if (selectorMap[category][theme] !== undefined) {
            selectorMap[category][theme] = true;
          }
        });
      });
    } 

    listedCategories.forEach(category => {
      // checking if there area themes part of the category
      if (listedThemes.length === 0 || !listedThemes.some(theme => Object.keys(data[category]).includes(theme))) {
        selectorMap[category].all = true;
      } else {
        selectorMap[category].all = false;
      }
    });

    // setting the products
    setProducts(shuffleArray(searchJSON(data, searchQuery, selectorMap, featured, listedCategories, listedThemes))); // this is for the products that are shown

    // every time the url changes, the menuProducts needs to be updated, and include the new selectorMap as part of the dependencies
    setAnimationMenu(<MenuCheckBoxes search={searchQuery} category={"animation"} selectorMap={selectorMap} categories={listedCategories} featured={featured} setSearchParams={setSearchParams} themes={listedThemes} navigate={navigate} />);
    setPhotographyMenu(<MenuCheckBoxes search={searchQuery} category={"photography"} selectorMap={selectorMap} categories={listedCategories} featured={featured} setSearchParams={setSearchParams} themes={listedThemes} navigate={navigate} />);  
  }, [window.location.href]);

  return (
    <>
      <section className="collection" >
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
              <h4 onClick={() => setAnimationMenuOpen(!animationMenuOpen)}>
                Animation
                {animationMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                    <path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" fill="#0F0F0F" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                    <path d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3Z" fill="#0F0F0F" />
                  </svg>
                )}
              </h4>

              {animationMenuOpen && (
                <motion.ul
                  initial={{ opacity: 0, height: "0px" }}
                  animate={animationMenuOpen ? { opacity:1, height: "auto" } : { opacity:0, height: "0px" }}
                  transition={{ duration: .2, ease: [0.16,1,0.3,1] }}
                  className="theme-list"
                >
                  {animationMenu}
                </motion.ul>
              )}
            </li>
            
            {/* PHOTOGRAPY */}
            <li>
              <h4 onClick={() => setPhotographyMenuOpen(!photographyMenuOpen)}>
                Photography
                {photographyMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                    <path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" fill="#0F0F0F" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                    <path d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3Z" fill="#0F0F0F" />
                  </svg>
                )}
              </h4>

              {photographyMenuOpen && (
                <motion.ul
                  initial={{ opacity: 0, height: "0px" }}
                  animate={photographyMenuOpen ? { opacity:1, height: "auto" } : { opacity:0, height: "0px" }}
                  transition={{ duration: .2, ease: [0.16,1,0.3,1] }}
                  className="theme-list"
                >
                  {photographyMenu}
                </motion.ul>
              )}


            </li>

          </ul>
        </nav>


        {/* This includes the resulting cards and then the search bar */}
        <section className="result_parent">
          {/* Searchbar */}
          <section className="searchbar">
            {/* The search bar */}
            <form>
              <button type="submit"><SearchIcon size={24} classname={"searchicon"}/> </button>

              <input value={searchQuery} onChange={(event) => { setSearchParams({ search: event.target.value, featured: featured.join("+") }) }  } spellCheck="false" type="text" className="search" name="search" autoComplete="off" placeholder="Search..."/>

            </form>

            <h2>
              <span className="title" style={{ userSelect: "none"}}>Collection</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="11px" viewBox="0 0 24 24" fill="none">
                  <path d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z" fill="rgb(130, 130, 130)"/>
                </svg>
              <span className="result">{searchQuery !== "" && <>Results for '{searchQuery}'</>}</span>
            </h2>
          </section>


          {/* These are the cards here */}
          <section className={products.length > 0 ? "results_child" : "noresults"}>
            {products.length > 0 ? (
              products.map(productID => (
                <Item key={productID} id={productID} />
              ))
            ) : (
              <>
                <h3>No results found.</h3>
                <p>Maybe you will like our <a href="/collection/?featured=1+1">featured works</a>.</p>
              </>
            )}
            {/* For if there are no results, make it say "We're Sorry. We couldn't find any matches. And then say: "maybe you will like our featured animation works" */}
          </section>

        </section>
      </section>
    </>
  );
}