import { useState, useEffect } from "react";
import "./collection.css";
import data from "../products.json";
import { motion } from 'framer-motion';
import { SearchIcon } from "../global/modules";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {Item,  shuffleArray } from "./Item";

// END OF IMPORTS

function checkForFeatured (data, searchTerm, checks) {
  // if it finds that only featured are checked then it will only return the featured
  // For if the check is only the featured
  const featuredResults = [];

  for (const categories of ["animation", "photography"]) {
    if (checks[categories].featured !== true) continue; // to continue to the other category

    // now for the category that is selected (or can be both)
    for (const themes of Object.keys(data[categories])) {
      // This iterates through the products in the current-category iteration and checks if it is feature
      for (const products of Object.keys(data[categories][themes])) {
        const product = data[categories][themes][products];

        // IF it is featured
        if (product.featured) {
          // Then check if the title is included in the search
          // checking the title and then the tags
          if (searchTerm !== "") { // if it is not empty
            if (product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                product.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
                  featuredResults.push(`${categories}.${themes}.${products}`);

                } 
          } else {
            featuredResults.push(`${categories}.${themes}.${products}`);
          }
        }

      }
    }

  }

  // have the ... for when doign the push
  return featuredResults;
  // for the search item just search through the things found with the checks
}
// functions for the searching 
function searchJSON(obj, searchTerm, checks, runFeaturedCheck = true) {
  const results = [];
  const lowercaseSearchTerm = searchTerm.toLowerCase();

  // Check the search term for any categories/theme
  for (const category of Object.keys(obj)) {
    if (searchTerm.toLowerCase().includes(category.replace("-", " ").toLowerCase())) {  
      Object.keys(data[category]).forEach((theme) => {
        Object.keys(data[category][theme]).forEach((product_id) => {
          results.push(`${category}.${theme}.${product_id}`);
        });
      });  
      continue;
    }

    // Else checking for the themes inside of each category 
    // Iterate through all of the themes
    Object.keys(data[category]).forEach((theme) => {
      if (searchTerm.toLowerCase().includes(theme.toLowerCase())) {
        Object.keys(data[category][theme]).forEach((product_id) => {
          results.push(`${category}.${theme}.${product_id}`);
        });
      }
    });

    // results.push(...themeResults);
  }

  // For checking to return featured items
  if (runFeaturedCheck && (checks["animation"].featured === true || checks["photography"].featured === true )) {
    // have the ... for when doign the push
    results.push(... checkForFeatured(data, searchTerm, checks));
  }

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

  return results.filter((item, index) => results.indexOf(item) === index);
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
  // left is animation and 1 is on and 0 is off --- IMPORTANT


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
  // Search params
  const [mainSearchParams] = useSearchParams();
  
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

        if (!theme_from_category_found) {
          newCheck[category].all = false;
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

    // Add in the new check for featured items or not
    const featured = mainSearchParams.get("featured") === null ? [0, 0] : mainSearchParams.get("featured");

    // left is the animation and right is photography, where 1 is on and 0 is off
    newCheck["animation"]["featured"] = featured[0] === '1' ? true : false;
    newCheck["photography"]["featured"] = featured[2] === '1' ? true : false;
    
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