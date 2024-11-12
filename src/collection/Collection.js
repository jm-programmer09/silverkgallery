import { useState, useEffect } from "react";
import "./collection.css";
import data from "../products.json";
import { motion } from 'framer-motion';
import { SearchIcon } from "../global/modules";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {Item,  shuffleArray } from "./Item";

// END OF IMPORTS
// we need to add a featured section to the searchJSON


// functions for the searching 
function searchJSON(obj, searchTerm, checks) {
  const results = [];
  const lowercaseSearchTerm = searchTerm.toLowerCase();

  function searchItem(item, path) {
    if (item.title && item.tags) {
      if (item.title.toLowerCase().includes(lowercaseSearchTerm) ||
          item.tags.some(tag => tag.toLowerCase().includes(lowercaseSearchTerm))) {
            
        results.push(path);
      }
    }
  }

  function traverseObject(obj, currentPath = []) {
    for (const [key, value] of Object.entries(obj)) {
      const newPath = [...currentPath, key];
      if (typeof value === 'object' && value !== null) {
        if (value.title && value.tags) {
          searchItem(value, newPath.join('.'));
        } else {
          traverseObject(value, newPath);
        }
      }
    }
  }

  for (const [category, categoryChecks] of Object.entries(checks)) {
    if (obj[category]) {
      if (categoryChecks.all) {
        traverseObject(obj[category], [category]);
      } else {
        for (const [theme, isChecked] of Object.entries(categoryChecks)) {
          if (isChecked && theme !== 'all' && obj[category][theme]) {
            traverseObject(obj[category][theme], [category, theme]);
          }
        }
      }
    }
  }

  return results;
}



// in the menuOpener function all we need is a function that shows the inputs that are highlighted or not
function MenuItems ( { title, categories, themes }) {
  const navigate = useNavigate(); // for changing the url depending on what happens

  // or we can do ?all=1%0 where the left side is animation and 1 means that it is on 
  // getting the ?all keyword and the ?featured 
  const [searchParams] = useSearchParams();

  // just used featured as we can make it all when it is just animation, or just photogrpahy, or both
  const featured = searchParams.get("featured") === null ? [0, 0] : searchParams.get("featured").split(" "); // this will be equal to 0/1+0/1 
  // featured is euqal to null if the .get is empty
  // left is animation and 1 is on and 0 is off 


  // to check that the 'all' is selected, check for whether the themes contains any specific themes, and if it doesnt, then all has been selected
  // for featured, the searchParams will be used

  // use filter to do it
  function addordelete(theme, themes, title) {
    let foundTheme = false;
  
    // Remove the theme if it exists
    themes = themes.filter((value) => {
      if (value === theme) {
        foundTheme = true;
        return false;
      }
      return true;
    });
  
    // If the theme wasn't found, add it
    if (!foundTheme) {
      themes.push(theme);
    }
  
    // check if their category is in it
    if (!categories.includes(title)) {
      categories.push(title);
    } 

    // Navigate regardless of whether we added or removed
    navigate(`/collection/${categories.join("+")}/${themes.join("+")}`);
  }
  function checkAll_Query (title) {
    // to check if the All should be checked or not, we are looking for whether the category is there and whether it has any of its sub themes
    if (categories === undefined || !categories.includes(title)) return false; // for if there is no category or the category is not the title

    // else - this means that it is in the categories list, so now checking if its themes are there, and if there are no themes then it is all to be selected
    let foundTitle_Theme = false; 

    // checking through the array
    themes.filter((value) => {

      if (Object.keys(data[title]).includes(value)) {
        foundTitle_Theme = true;
      }

      return true;
    });

    if (foundTitle_Theme) return false;
    // else return true

    return true; // if it is to be selected
  }
  // this is the function for when the all button is clicked, whether it make it all or not, so if it is already currently all, then make it not all
  // and when making it not all, just delete the category title
  // and when making it all, add the category in and delete all the themes 
  function checkAll (title) {
    // First if there are no categories it is an easy add
    if (categories === undefined) {
      navigate(`/collection/${title}/${featured !== null && `?featured=${featured.join("+")}`}`);
      return;
    }

    // then checking if the category isnt there, then make it so it is there
    if (!categories.includes(title)) {
      categories.push(title);

      // now putting the categories in
      navigate(`/collection/${categories.join("+")}/${themes === undefined ? "" : themes.join("+")}/${featured !== null && `?featured=${featured.join("+")}`}`);
      return;
    }

    // IF there is the category and the themes, then delete that, else change it so that there are no more themes of that category type but keep the category
    // check if it has sub themes
    let foundSubThemes = false;

    themes = themes.filter((value) => {
      if (Object.keys(data[title]).includes(value)) {
        foundSubThemes = true;
        return false;
      }
      return true;
    });

    // if sub themes are found, that means it is time to change it to all, but if there arent, then that means turn it off all
    if (foundSubThemes) {
      if (!categories.includes(title)) categories.push(title);

      navigate(`/collection/${categories.join("+")}/${themes.join("+")}/${featured !== null && `?featured=${featured.join("+")}`}`);
    } else {
      // this is for making it not all
      categories = categories.filter((value) => {
        if (value === title) return false;
        return true;
      });

      navigate(`/collection/${categories}/${themes === undefined ? " " : themes.join("+")}/${featured !== null && `?featured=${featured.join("+")}`}`);
    }

  }

  // for whether to show the featured or not
  function feature (title) {
    // now changing the zeros

    if (checkAll_Query(title)) checkAll(title);

    if (title === "animation") {
      featured[0] = featured[0] === '1' ? '0' : '1';
    } else { // photography
      featured[1] = featured[1] === '1' ? '0' : '1';
    }

    // redirection
    navigate(`/collection/${categories !== undefined ? categories.join("+") : ""}/${themes !== undefined ? themes.join("+") : ""}/?featured=${featured.join("+")}`);
  }

  // test
  return (
    <>
      {/* Here we just add in the inputs  */}
      {/* For the all and featured area */}
      <li>
        <input onChange={() => {checkAll(title)}} type="checkbox" id={`all-${title}`} checked={checkAll_Query(title)}  />
        <label htmlFor={`all-${title}`}>All</label>
      </li>

      <li>
        <input onChange={() => { feature (title ) }} type="checkbox" id={`featured-${title}`} checked={title === "animation" ? ( featured[0] === '1' ? true : false ) : ( featured[1] === '1' ? true : false ) } />
        <label htmlFor={`featured-${title}`}>Featured</label>
      </li>


      {/* For the actual themes */}
      {Object.keys(data[title]).map((theme, index) => {
        // Create unique ID for each checkbox
        const uniqueID = `${title}-${theme}-${index}`;

        return (
          <li key={index}>
            <input onChange={() => {addordelete (theme, themes, title) }} type="checkbox" id={uniqueID} checked={themes.includes(theme) ? true : false } />
            <label htmlFor={uniqueID}> {theme.replace("-", " ")} </label>
          </li>
        )
      })}
    </>
  );
}

// Main function
export default function OurCollection () {
  // For getting the /:categories/:themes
  const { categories, themes } = useParams();
  
  // For getting the real values
  // Combining the themes of animation and photography together
  const animationThemes = Object.keys(data.animation);
  const photographyThemes = Object.keys(data.photography); 
  const dataCategories = Object.keys(data); // For the categories

  // Location
  const location = useLocation();

  // For redirecting the user
  const navigate = useNavigate();

  // getting the search results if a search was inputted
  const [searchParams] = useSearchParams();
  const initSearchRequest = searchParams.get("search");

  // For rendering the menu
  const [animationMenu, setAnimationMenu] = useState(<></>);
  const [animationMenuOpen, setAnimationMenuOpen] = useState(categories !== undefined ? (categories.split("+").includes("animation") ? true : false ) : false);
  const [photographyMenu, setPhotographyMenu] = useState(<></>);
  const [photographyMenuOpen, setPhotographyMenuOpen] = useState(categories !== undefined ? (categories.split("+").includes("photography") ? true : false) : false);

  // we have to do the url search
  // The search request by the user
  const [searchQuery, setSearchQuery] = useState(initSearchRequest ? initSearchRequest : "");
  const [products, setProducts] = useState([]);
  const [check, setCheck] = useState({
    animation: {
      all: false,
    },
    photography: {
      all: false,
    }
  });

  // this is for the pure location.pathname changes
  // Contains the inside part of the menu
  useEffect(() => {
    // Everytime the url changes, the menu will update with it
    // FIRST check that the url is suitable - instead of sending the user to an error page, instead just parse it for them
    
    const parsedCategories = []; // the ones that do work will be put in here, if the list is still empty by the end then the themes will not be added on
    const parseThemes = []; // same thing for this

    // Test if the user has any params
    if (categories !== undefined) {
      // Check the categories 
      categories.split("+").forEach((category) => {
        // If the categori is found in the categories possible, then it will be added in the parsedCategories
        if (dataCategories.includes(category)) parsedCategories.push(category); 
      });

      // To not waste time,
      if (parsedCategories.length === 0) {
        setAnimationMenu(<MenuItems title={"animation"} categories={parsedCategories} themes={parseThemes} check={check} changeCheck={setCheck} />);
        setPhotographyMenu(<MenuItems title={"photography"} categories={parsedCategories} themes={parseThemes} check={check} changeCheck={setCheck}/>);

        navigate("/collection");
        return;
        // END
      }

      // Just add the categories in
      if (themes === undefined) { 
        setAnimationMenu(<MenuItems title={"animation"} categories={parsedCategories} themes={parseThemes} check={check} changeCheck={setCheck}/>);
        setPhotographyMenu(<MenuItems title={"photography"} categories={parsedCategories} themes={parseThemes} check={check} changeCheck={setCheck}/>);

        navigate(`/collection/${parsedCategories.join("+")}`);
        return;
      }

      // Parse the themes
      themes.split("+").forEach((theme) => {
        // we need to check if the theme fits what the categories are
        // Check for if it is an animation theme
        switch (parsedCategories) {
          case ["animation"]:
            if (animationThemes.includes(theme)) parseThemes.push(theme);
            break;

          case ["photography"]:
            if (photographyThemes.includes(theme)) parseThemes.push(theme);
            break;

          default: // this is for both
            if (photographyThemes.includes(theme) || animationThemes.includes(theme)) parseThemes.push(theme);

        }
      });

    setAnimationMenu(<MenuItems title={"animation"} categories={parsedCategories} themes={parseThemes} check={check} changeCheck={setCheck}/>);
    setPhotographyMenu(<MenuItems title={"photography"} categories={parsedCategories} themes={parseThemes} check={check} changeCheck={setCheck}/>);

    if (categories.split("+").length === parsedCategories.length && parseThemes.length === themes.split("+").length) return; // no rerender

      // sorted categories and themes
      navigate(`/collection/${parsedCategories.join("+")}/${parseThemes.join("+")}`);
    } 

    // This is for changing the menus
    setAnimationMenu(<MenuItems title={"animation"} categories={parsedCategories} themes={parseThemes} check={check} changeCheck={setCheck}/>);
    setPhotographyMenu(<MenuItems title={"photography"} categories={parsedCategories} themes={parseThemes} check={check} changeCheck={setCheck}/>);
  }, [location.pathname]);

  // FOr changing the check when the user puts in a search or when the location is change
  // this is also for searching for elements
  useEffect(() => {
    // Adding in all of the themes and checking which ones to make true or false
    // For both of the animation and photography
    const newCheck = { ...check };
    for (const category of Object.keys(data)) {
      const themes_of_category = Object.keys(data[category]);

      // if there are no themes, but there are categories
      if (themes === undefined && categories) {
        newCheck[category].all = categories.includes(category);

        // setting all the themes to false, but the all is true
        themes_of_category.forEach(theme => {
          newCheck[category][theme] = false;
        })
      } else if (themes) { // if there are themes that are found
        // if a theme from the category is found, then make the .all = false, otherwise make it true
        let theme_from_category_found = false;

        themes_of_category.forEach(theme => {
          if (!theme_from_category_found && themes.includes(theme)) {
            theme_from_category_found = true;
          } 

          // then changing the newCheck
          newCheck[category][theme] = themes.includes(theme);
        });

        // now for the all part
        if (theme_from_category_found) {
          newCheck[category].all = false;
        } else {
          newCheck[category].all = true;
        }
      } else if (categories !== undefined && !categories.includes(category)) {
        // make everything false from this category
        newCheck[category].all = false;
        themes_of_category.forEach(theme => {
          newCheck[category][theme] = false;
        });
      } else { // if there are no categories and no themes
        newCheck[category].all = true;
        themes_of_category.forEach(theme => {
          newCheck[category][theme] = false;
        });
      }
    }

    setCheck(newCheck);

    // for adding in the results
    const results = shuffleArray(searchJSON(data, searchQuery, check));
    setProducts(results);


  }, [location.pathname, searchQuery])


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

              <input value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value);  }  } spellCheck="false" type="text" className="search" name="search" autoComplete="off" placeholder="Search..."/>

            </form>

            <h2>
              <span className="title">Silver K Gallery</span>
              <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" fill="rgb(130, 130, 130)" version="1.1" width="8px" height="8px" viewBox="0 0 103.536 103.536" >
                <g>
                  <g>
                    <path d="M0.65,91.928c1.221,2.701,3.881,4.3,6.665,4.3c1.006,0,2.029-0.209,3.006-0.65l88.917-40.195    c2.688-1.216,4.381-3.925,4.295-6.873c-0.085-2.948-1.934-5.554-4.687-6.609L9.929,7.794C6.17,6.352,1.933,8.23,0.489,12.001    c-1.447,3.769,0.438,7.995,4.207,9.44l72.569,27.834L4.299,82.255C0.62,83.92-1.012,88.249,0.65,91.928z"/>
                  </g>
                </g>
              </svg>
              <span className="result">{categories !== undefined && (categories.includes("animation") && categories.includes("photography") ? "Animation + Photography" : ( categories.includes("animation") ? "Animation" : (categories.includes("photography") && "Photography"  ) ) ) } </span>
            </h2>
          </section>


          {/* These are the cards here */}
          <section className="results_child" >
          {products.length > 0 ? (
            products.map(productID => (
              <Item key={productID} id={productID} />
            ))
          ) : (
            <p>No results found. Maybe you will like our featured works.</p>
          )}
            {/* For if there are no results, make it say "We're Sorry. We couldn't find any matches. And then say: "maybe you will like our featured animation works" */}
          </section>

        </section>
      </section>
    </>
  );
}

// When the nav bar has to go mobile, change it so that it becomes a button called 'filters' and that button then opens the same nav menu up but covering the whole screen
// when we move to using the url's of the page, change it so that the listopener has another parameter for whether it shows the menu or not