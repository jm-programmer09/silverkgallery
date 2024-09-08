import { Link } from "react-router-dom";

import "./home.css";

export default function Home () {
  return (
    <>
      <section className="main">
        <figure>
          <img src="/img/ronniewoods.jpg" alt="Ronnie Woods Art"/>
          
          {/* For the text on the right */}
          <figcaption>
            <h1><span>discover </span><span>timeless </span><span> animatography</span></h1>
            <h2>Silver K Gallery - Celebrating 40 years of Artistic Innovation</h2>

            <Link to={"/collection"}>Explore our collection</Link>
          </figcaption>
        </figure>
      </section>

    </>
  );
}