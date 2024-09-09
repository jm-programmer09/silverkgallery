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
            <h1><span className="h1-one">discover </span><span className="h1-two">timeless </span><span className="h1-three"> animatography</span></h1>
            <h2>Silver K Gallery - Celebrating 40 years of Artistic Innovation</h2>

            <Link to={"/collection"}>Explore our collection</Link>
          </figcaption>
        </figure>
      </section>
  
      // Piece of the week
      <section className="pow">
        <figure>
          <figcaption>
            <h2>Piece of the Week</h2>
            <h3>The Engine of Imagination</h3>
            <p> Walt Disney had a long fascination with trains.
His father and an uncle had spent time working on railroads, and as a teen in Kansas City Walt did a brief stint selling newspapers and snacks on trains.  Later, Walt constructed elaborate model train sets as a way to unwind from the stress of his job. In the late 1940s, he built himself a one-eighth-scale steam locomotive, and after moving into a new home in the Holmby Hills section of Los Angeles in 1950 he laid half a mile of tracks around the property for his railroad. He would dress up in a train engineer’s clothing and give visitors rides on his Carolwood Pacific Railroad, named for the street he lived on.
His passion for trains is reflected at Disneyland, which has been home to its own railroad since opening in 1955.</p>
          </figcaption>

          <img src="/img/engineofimagination.jpg" alt="Piece of the week" />
        </figure>
      </section>
    </>
  );
}
