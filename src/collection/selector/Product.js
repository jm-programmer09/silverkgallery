import { Link, useParams } from "react-router-dom";
import "./product.css";
import data from "../../products.json";
import NotFound from "../../global/NotFound";
import { Fragment, useState } from "react";

export default function Product () {
  const { categories, themes, id, subid } = useParams();

  const product = subid !== undefined ? data[categories][themes].subcategories[id][subid] : data[categories][themes][id];

  const [imageWidth, setImageWidth] = useState(0);

  // If the product is not found (aka undefined)
  if (product === undefined) {
    return <NotFound />;
  }

  // Parse the dimensions
  let display_base_dimensions = "No specific size";

  // If there are dimensions (dimensions are only found for items in animation)
  if (product.dimensions !== 0) {
    // If there are multiple dimensions
    if (typeof product.dimensions[0][0] === 'object') {
      display_base_dimensions = product.dimensions[0];
    } else if (product.dimensions[0] !== 0) {
      display_base_dimensions = `${product.dimensions[0][0]}" x ${product.dimensions[0][1]}"`;
    }
  }

  // for if the image is wider than 500px, it is then fit for its width and not height
  const checkSizing = (event) => {
    const { naturalWidth, naturalHeight } = event.target;

    if (naturalWidth > naturalHeight) {
      setImageWidth(naturalWidth);
    }
  };

  return (
    <>
      <section className="products">
          {/* No need to worry about the prodcut not being found as there is already a redirection */}
          <div className="left">
            <div className="top">
              {/* For the history of the element */}
              <div className="hierarchyrow">
                <Link style={{ color: "black"}} to={`/collection`}>Collection</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="11px" viewBox="0 0 24 24" fill="none">
                  <path d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z" fill="rgb(130, 130, 130)"/>
                </svg>
                <Link to={`/collection/${categories}`}>{categories.replace("-", " ")}</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="11px" viewBox="0 0 24 24" fill="none">
                  <path d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z" fill="rgb(130, 130, 130)"/>
                </svg>
                <Link style={{ color: "rgb(130, 130, 130)"}} to={`/collection/${categories}/${themes}`}>{themes.replace("-", " ")}</Link>

              </div>

            </div>
            <div className={ imageWidth > 500 ? "img parentwide" : "img"} >
              <img className={ imageWidth > 500 ? "wideimg" : ""} onLoad={checkSizing} draggable={false} style={{ userSelect: "none"}} title={product.title.replace(/^\w/, (c) => c.toUpperCase())} alt={product.title} loading="eager" fetchpriority="high" src={process.env.PUBLIC_URL + `/img/${categories}/${themes}/${product.image}`} />
            </div>
          </div>

          <div className="right">
            <h3>Officially Licensed Artwork</h3>

            <h1>
              {product.title.replace("-", " ")}
            </h1>

            {/* For the featured and limited edition tag */}
            <div className="tag-row" style={{ display: product.featured || product.special ? "flex" : "none" }}> 
              { product.featured && <div className="tag" style={{ backgroundColor: "#ffce31", color: "black"}}>featured</div> }
              
              { product.special && 
                <>
                  {product.special[0] && <div className="tag" style={{ backgroundColor: "#003399"}}>limited edition</div> }
                  
                  {product.special.length > 2 && (
                    <>
                    { product.special[2] && 

                      <div className="tag" style={{ backgroundColor: "#0055ff"}}>Signed</div>
                    }
                    </>
                  )}
                  
                  {product.special.length > 1 && <> 
                  
                    { product.special[1] && 
                      <div className="tag" style={{ backgroundColor: "rgb(180, 180, 180)", color: "white"}}>Original Cel</div>
                    } 
                    
                  </> }
                
                </>
              }
              
            </div>

            {/* Have a tag row underneath saying 'featured' - yellow or 'limited edition' - #003399 */}

            {product.author ? 
              <h4 style={{ color: "black", marginBottom: "20px"}}> <span>{product.type} by </span>{product.author.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()).replace("-", " ")}</h4>
              :
              <>
                {categories.toLowerCase() === "animation" && <h4 style={{ color: "black", marginBottom: "20px"}}><span>by </span>{themes.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()).replace("-", " ")}</h4>}
              </>
            }
            
            <h2>Details:</h2>
            
            {/* List of details */}
            <ul>
              { product.type && categories !== "photography" &&
                <li>{ product.special ? <>{product.special[0] && <>Limited edition</> } {product.special[1] && <> {product.special[0] ? <>o</> : <>O</>}riginal </>} {product.type.toLowerCase()}</> : <>{String(product.type).charAt(0).toUpperCase() + String(product.type).slice(1)}</> }</li>
              }

              {/* For the sizing  */}
              <li>
                {display_base_dimensions instanceof Array ? (
                      display_base_dimensions.map((value, index) => (
                        <Fragment key={index}>
                          {`${value[0]}" x ${value[1]}"`}
                          {index !== display_base_dimensions.length - 1 && <>&ensp;or&ensp;</>}
                        </Fragment>
                      ))
                    ) : (
                      display_base_dimensions
                )}
              </li>

              {product.dimensions[1] !== 0 && product.dimensions[1] && (
                <li>Edition Size: {product.dimensions[1]}</li>         )}
              {product.dimensions[2] !== 0 && product.dimensions[2] && (
                <li>Paper Edition Size: {product.dimensions[2]}</li>               )}
              {product.dimensions[3] !== 0 && product.dimensions[3] && (
                <li>Giclée Edition Size: {product.dimensions[3]}</li> 
              )}
              {product.dimensions[4] !== 0 && product.dimensions[4] && (
                <li>Canvas Edition Size: {product.dimensions[4]}</li> 
              )}

              {/* For the notes */}
               { product.note && 
                <li> {product.note} </li>
              }

            </ul>
            
            <p>Interested in this piece?</p>
            <div className="button-row">
              <a style={{ paddingLeft: "23px"}} href="tel:(03)9509-5577">
              <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none"><path d="M2.00589 4.54166C1.905 3.11236 3.11531 2 4.54522 2H7.60606C8.34006 2 9.00207 2.44226 9.28438 3.1212L10.5643 6.19946C10.8761 6.94932 10.6548 7.81544 10.0218 8.32292L9.22394 8.96254C8.86788 9.24798 8.74683 9.74018 8.95794 10.1448C10.0429 12.2241 11.6464 13.9888 13.5964 15.2667C14.008 15.5364 14.5517 15.4291 14.8588 15.0445L15.6902 14.003C16.1966 13.3687 17.0609 13.147 17.8092 13.4594L20.8811 14.742C21.5587 15.0249 22 15.6883 22 16.4238V19.5C22 20.9329 20.8489 22.0955 19.4226 21.9941C10.3021 21.3452 2.65247 13.7017 2.00589 4.54166Z" fill="white"></path></svg>


                Call us</a>
              <Link className="right" to={`/collection/${categories}/${themes}`}>See more like this...</Link>
            </div>          
          
          </div>


      </section>

    </>
  );
}