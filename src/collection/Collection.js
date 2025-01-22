import { useState, useEffect, Fragment } from "react";
import "./collection.css";
import data from "../products.json";
import { motion } from "framer-motion";
import { SearchIcon } from "../global/modules";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Item, shuffleArray } from "./Item";

// End of imports

// function for searching through data.json for suitable results
// this is a linear search function
function searchJSON(data, searchTerm, featured, categories, themes, resultMaxNumber, startingResults = [], searchParams= new URLSearchParams()) {
  searchTerm = searchTerm.toLowerCase();
  // Once there are more than 52 results then we will have a button to load more
  const results = startingResults;


  // see whether the .some function works well
  (categories.length === 0 ? Object.keys(data) : categories).forEach(category => {
    if (resultMaxNumber <= results.length) return; // if the results are more than the max number then return;

    // Check if it is featured in here as well
    (themes.length === 0 ? Object.keys(data[category]) : themes).forEach(theme => {
      // this is looping through the themes
      // the themes.length === 0 blah is so that if the function is on 'all' mode, it then checks through all themes - this goes the same for the categories 
      if (resultMaxNumber <= results.length) return; // if the results are more than the max number then return;

      // Now iterating through the for loop
      Object.entries(data[category][theme]).forEach(([productID, product]) => {
        if (resultMaxNumber <= results.length) return; // if the results are more than the max number then return;

        // Cheking if the productID is the subcategory
        if (productID === "subcategories") {
          // Now filtering through the subcategories
          // this will be based off of the ?=disney blah blah cos the subcategories picked are like if disney is selected an a subcategory is picked then: ?subdisney=blah


          // now that the url is working we just have to search for the item
          Object.keys(data[category][theme].subcategories).forEach(subcategory => {
            // Now going through all of the items inside of the subcategories
            if (searchParams.get(`sub${theme}`) === null || searchParams.get(`sub${theme}`).split("+").length < 1 || searchParams.get(`sub${theme}`).split("+").includes(subcategory)) {
              Object.entries(data[category][theme].subcategories[subcategory]).forEach(([subproductID, subproduct]) => { // now going through all fo the products
                if (resultMaxNumber <= results.length || results.includes(`${category}.${theme}.subcategories.${subcategory}.${subproductID}`)) {
                  return;
                }

                if (featured.includes(1)) {
                  if (subproduct.featured && (featured[category === "animation" ? 0 : 1] === 1) && ( subproduct.title.toLowerCase().includes(searchTerm) || subproduct.type.toLowerCase().includes(searchTerm.toLowerCase() === "giclee" || searchTerm.toLowerCase() === "gicle" ? "giclée" : searchTerm) || subproduct.tags.includes(searchTerm)  )) results.push(`${category}.${theme}.subcategories.${subcategory}.${subproductID}`);
                } else if (( 
                  subcategory.includes(searchTerm.replaceAll(" ", "-")) ||
                  searchTerm.replaceAll(" ", "-").includes(subcategory) ||
                  theme.includes(searchTerm) ||
                  searchTerm.includes(theme) ||
                  theme.includes(searchTerm.replaceAll(" ", "-")) ||
                  searchTerm.replaceAll(" ", "-").includes(theme) ||
                  
                  
                  subproduct.title.toLowerCase().includes(searchTerm) || subproduct.type.toLowerCase().includes(searchTerm.toLowerCase() === "giclee" || searchTerm.toLowerCase() === "gicle" ? "giclée" : searchTerm) || subproduct.tags.some((tag) => tag.toLowerCase().includes(searchTerm) || searchTerm.includes(tag.toLowerCase()))  )) results.push(`${category}.${theme}.subcategories.${subcategory}.${subproductID}`);
                
              });
            }
          });

          return;
        }

        // Checking for if it is already in the list
        if (results.includes(`${category}.${theme}.${productID}`)) return;


        // if it is featured
        if (featured.includes(1)) {
          if (product.featured && (featured[category === "animation" ? 0 : 1] === 1) && ( product.title.toLowerCase().includes(searchTerm) || product.type.toLowerCase().includes(searchTerm.toLowerCase() === "giclee" || searchTerm.toLowerCase() === "gicle" ? "giclée" : searchTerm) || product.tags.includes(searchTerm)  )) results.push(`${category}.${theme}.${productID}`);
        } else if ((
          product.title.toLowerCase().includes(searchTerm) || 
          
          product.type.toLowerCase().includes(searchTerm.toLowerCase() === "giclee" || searchTerm.toLowerCase() === "gicle" ? "giclée" : searchTerm) || product.tags.some((tag) => tag.toLowerCase().includes(searchTerm) || searchTerm.includes(tag.toLowerCase()))
          ||
          // For the searching the categories
          category.includes(searchTerm) ||
          searchTerm.includes(category) ||

          // for searching for themes
          theme.includes(searchTerm) ||
          searchTerm.includes(theme) ||
          theme.includes(searchTerm.replaceAll(" ", "-")) ||
          searchTerm.replaceAll(" ", "-").includes(theme) 


        )) results.push(`${category}.${theme}.${productID}`);
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
function MenuCheckBoxes ( { category, selectorMap, featured, themes, navigate, categories } ) {  
  const [searchParams, setSearchParams] = useSearchParams();

  // for the generating more button
  const [shouldScroll, setShouldScroll] = useState(false);
  const [showAllThemes, setShowAllThemes] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);
  

  useEffect(() => {
    if (shouldScroll) {
      window.scrollTo({ top: scrollPosition, behavior: "instant" });
      setShouldScroll(false);
    }
  }, [shouldScroll, scrollPosition]);

  const updateOneParam = (paramName, newValue) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(paramName, newValue);
    setSearchParams(newSearchParams);
  };

  // feautured and search are already defined in the parent function and accessible as paramters, the rest for the subcategory will be defined later

  function generalClick () {
    const howFarTheUserIsDown = window.pageYOffset;
    setScrollPosition(howFarTheUserIsDown);
    setShouldScroll(true);
  }
  
  // the function for if the all button is checked on/off
function allClicked(category) {
  generalClick();

  const endCategoryList = themes.length < 1 ? categories.includes(category) ? categories.filter(cat => cat !== category).join("+") : categories.concat(category).join("+") : categories.join("+");      
  
  let endThemeList = "";

  if (themes.length > 0) {
    let updatedThemes = [...themes];
    Object.keys(data[category]).forEach(categoryTheme => {
      updatedThemes = updatedThemes.filter(theme => theme !== categoryTheme);
    });
    endThemeList = updatedThemes.join("+");
  }

  // Remove 'sub' parameters for the themes of the clicked category
  const newSearchParams = new URLSearchParams(searchParams);
  Object.keys(data[category]).forEach(theme => {
    newSearchParams.delete(`sub${theme}`);
  });

  // Changing the URL now
  navigate(`/collection/${endCategoryList}/${endThemeList}/?${newSearchParams.toString()}`);
}

  
  // the function for featured
  // featured works
  function featuredClicked () {
    generalClick();

    if (category === "animation") {
      updateOneParam("featured", `${featured[0] === 1 ? "0" : "1"}+${featured[1]}`);
    } else {
      updateOneParam("featured", `${featured[0]}+${featured[1] === 1 ? "0" : "1"}`);
    }
  }

  // For the themes
  function themeClicked (currentTheme) {
    generalClick();
    // if the theme is already selected, then we want to remove it from the url
    // if the theme is not selected, then we want to add it to the url
    const endThemeList = themes.includes(currentTheme) ? themes.filter(theme => theme !== currentTheme).join("+") : themes.concat(currentTheme).join("+");
    const endCategoryList = categories.includes(category) ? categories.join("+") : categories.concat(category).join("+");
    
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSearchParams.get(`sub${currentTheme}`) !== null) {
      newSearchParams.delete(`sub${currentTheme}`);
    }

    // changing the url now
    navigate(`/collection/${endCategoryList}/${endThemeList}/?${newSearchParams.toString()}`);
  }

  // For clicking on the subcategories
  function subCategoryClicked (parent_theme, subcategory) {
    generalClick();

    // if the subcategory is already selected, then we want to remove it from the url
    // if the subcategory is not selected, then we want to add it to the url
    // if there is no sub${theme} in the url then we want to add it to the url

    const no_more_parent_sub = new URLSearchParams(searchParams);
    no_more_parent_sub.delete(`sub${parent_theme}`);

    if (searchParams.get(`sub${parent_theme}`) === null) {
      // if there is no sub${theme} in the url then we want to add it to the url
      updateOneParam(`sub${parent_theme}`, subcategory);
    } else {
      // check if their is the subcategory in or not
      searchParams.get(`sub${parent_theme}`).split("+").includes(subcategory) ? (
      
      searchParams.get(`sub${parent_theme}`).split("+").length === 1 ? 
        setSearchParams(no_more_parent_sub)
      :

      updateOneParam(`sub${parent_theme}`, searchParams.get(`sub${parent_theme}`).split("+").filter(sub => sub !== subcategory).join("+")) 
      
    ) : updateOneParam(`sub${parent_theme}`, `${searchParams.get(`sub${parent_theme}`)}+${subcategory}`);
    }
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
      {Object.keys(data[category]).map((theme, index) => (
        <Fragment key={`${category}-${theme}-${index}`}>
          {(index < 6 || showAllThemes) && (
            <>
              <li>
                <input
                  type="checkbox"
                  id={`${category}-${theme}-${index}`}
                  checked={selectorMap[category][theme]}
                  onChange={() => themeClicked(theme)}
                />
                <label htmlFor={`${category}-${theme}-${index}`}>{theme === "dc-comics" ? "DC Comics" : (theme === "afl" ? "AFL" : theme.replaceAll("-", " "))}</label>
              </li>

              {/* These are for the subcategories */}
              <motion.ul 
                initial={{ opacity: 0, height: "0px" }}
                animate={selectorMap[category][theme] ? { opacity:1, height: "auto" } : { opacity:0, height: "0px" }}
                transition={{ duration: .2, ease: [0.16,1,0.3,1] }}
                className="theme-list" style={{display: selectorMap[category][theme] ? "block" : "none"}}>
                {/* Subcategories rendering code... */}
                {Object.keys(data[category][theme].subcategories || {}).map((subcategoryKey, subIndex) => (
                  <li key={`${category}-${theme}-${subIndex}-subcat`}>
                    <input
                      type="checkbox"
                      id={`subcategory-${category}-${theme}-${subIndex}`}
                      checked={searchParams.get(`sub${theme}`) === null ? false : searchParams.get(`sub${theme}`).split("+").includes(subcategoryKey)}
                      onChange={() => subCategoryClicked(theme, subcategoryKey)}
                    />
                    <label htmlFor={`subcategory-${category}-${theme}-${subIndex}`} style={{ fontSize: "16px", marginBottom: "1px"}}>
                     {subcategoryKey.replaceAll("-", " ")}
                    </label>
                  </li>
                ))}
              </motion.ul>
            </>
          )}
        </Fragment>
      ))}

      {Object.keys(data[category]).length > 6 && !showAllThemes && (
        <li onClick={() => setShowAllThemes(true)} id="downButton">
          See more
          <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24" fill="none">
            <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="var(--gradientTo)"/>
          </svg>
        </li>
      )}

      {showAllThemes && Object.keys(data[category]).length > 6 && (
        <li onClick={() => setShowAllThemes(false)} className="upButton">
          See less
          <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24" fill="none">
            <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="var(--gradientTo)"/>
          </svg>
        </li>
      )}
      {/* {Object.keys(data[category]).map((theme, index) => (
        <Fragment key={`${category}-${theme}-${index}`}>
          <li>
            <input
              type="checkbox"
              id={`${category}-${theme}-${index}`}
              checked={selectorMap[category][theme]}
              onChange={() => themeClicked(theme)}
            />
            <label htmlFor={`${category}-${theme}-${index}`}>{theme === "dc-comics" ? "DC Comics" : ( theme === "afl" ? "AFL" : theme.replaceAll("-", " "))}</label>
          </li>

          {index === 5 && (
            <>
              <a>See more</a>

            </>
          )}

          {/* These are for the subcategories 

          <motion.ul 
          initial={{ opacity: 0, height: "0px" }}
          animate={selectorMap[category][theme] ? { opacity:1, height: "auto" } : { opacity:0, height: "0px" }}
          transition={{ duration: .2, ease: [0.16,1,0.3,1] }}
          className="theme-list" style={{display: selectorMap[category][theme] ? "block" : "none"}}>
            {/* This is for the actual subcategories and not just searching for limited editions etc 
           {Object.keys(data[category][theme].subcategories || {}).map((subcategoryKey, subIndex) => (
            <li key={`${category}-${theme}-${subIndex}-subcat`}>
              <input
                type="checkbox"
                id={`subcategory-${category}-${theme}-${subIndex}`}
                checked={searchParams.get(`sub${theme}`) === null ? false : searchParams.get(`sub${theme}`).split("+").includes(subcategoryKey)}
                onChange={() => subCategoryClicked(theme, subcategoryKey)}
              />
              <label htmlFor={`subcategory-${category}-${theme}-${subIndex}`} style={{ fontSize: "16px", marginBottom: "1px"}}>
               {subcategoryKey.replaceAll("-", " ")}
              </label>
            </li>
          ))}
          </motion.ul>
        </Fragment>
      ))} */}

    </>
  )
} 


// MAIN
export default function OurCollection () {
  const [resultMaxNumber, setResultMaxNumber] = useState(52); // the maximum number of results that can be shown - make sure it is a multiply of 4
  // set the resultMaxNumber back to 52 on any change of the url

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

  // for the generating more button
  const [shouldScroll, setShouldScroll] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

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
    setResultMaxNumber(52); // setting the resultMaxNumber back to 52 on any change of the url

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
    setProducts(shuffleArray(searchJSON(data, searchQuery, featured, listedCategories, listedThemes, resultMaxNumber, [], searchParams))); // this is for the products that are shown

    // every time the url changes, the menuProducts needs to be updated, and include the new selectorMap as part of the dependencies
    setAnimationMenu(<MenuCheckBoxes search={searchQuery} category={"animation"} selectorMap={selectorMap} categories={listedCategories} featured={featured} themes={listedThemes} navigate={navigate} />);
    setPhotographyMenu(<MenuCheckBoxes search={searchQuery} category={"photography"} selectorMap={selectorMap} categories={listedCategories} featured={featured} themes={listedThemes} navigate={navigate} />);  
  }, [window.location.href]);

  useEffect(() => {
    if (shouldScroll) {
      window.scrollTo({ top: scrollPosition, behavior: "instant" });
      setShouldScroll(false);
    }
  }, [products, shouldScroll, scrollPosition]);


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

          { products.length >= resultMaxNumber && ( <section className="extrabutton"> <button className="button" onClick={() => {
          const howFarTheUserIsDown = window.pageYOffset;
          setScrollPosition(howFarTheUserIsDown);
          setShouldScroll(true);
          setResultMaxNumber(resultMaxNumber + 52);
          setProducts(searchJSON(data, searchQuery, featured, categories !== undefined ? categories.split("+") : [], themes !== undefined ? themes.split("+") : [], resultMaxNumber + 52, products, searchParams));
        }}>Click to see more...</button> </section>)}

        </section>
      </section>
    </>
  );
}