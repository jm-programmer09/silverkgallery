import "./notfound.css";
import { Link } from "react-router-dom";

export default function NotFound () {
  return (
    <>
      <section className="notfound">
        <h1><span style={{ color: "var(--primary)"}} >404 Error</span> - Page not found</h1>

        <img width={500} src={process.env.PUBLIC_URL + "/img/notfound_image.gif"} />

        <p>Even bugs bunny is confused</p>

        <h2>Find what you are looking for:</h2>

        <div className="button-row">
          <Link to={"/contactus"}>
            Contact us
          </Link>


          <Link to={"/collection"}>
            Our Collection
          </Link>


        </div>


      </section>
    </>
  );
}

// have a browse our collection button - make this look like the main button on the home page
// have a contact us button link - make this look like the main button being hovered on the home page