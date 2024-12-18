import { Link, useParams } from "react-router-dom";
import "./product.css";
import data from "../../products.json";
import NotFound from "../../global/NotFound";

export default function Product () {
  const { categories, themes, id } = useParams();

  const product = data[categories][themes][id];

  // If the product is not found (aka undefined)
  if (product === undefined) {
    return <NotFound />;
  }

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
            <div className="img">
              <img alt={product.title} loading="eager" src={process.env.PUBLIC_URL + `/img/${categories}/${themes}/${product.image}`} />
            </div>
          </div>

          <div className="right">




          </div>

      </section>

    </>
  );
}

// For this page:
// Make it look like acme
// have a button at the top left for returning to the collections page and then also have that hierarchy list link thing
// then below that have the image,
// on the right then have the information on the product