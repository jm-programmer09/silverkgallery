import "./contact.css";


export default function ContactUs () {
  return (
    <>
      {/* Have line boxes around the text of the images */}
      <div className="contact_us">
        <div className="left">

        </div>


        {/* Includes the gallery bit */}
        <div className="right">

          {/* this includes the images and stuff */}
          <div className="panel">

            {/* The text that goes over the images */}
            <p className="text">
              <h2>Let's talk.</h2>

              <small>Share your excitement with us.</small>


              {/* Add an arrow in here for the links */}
              <div className="link-row">
                <a href="mailto:colin@silverkgallery.com.au">Email</a>
                <a href="tel:(03)95095577">Call</a>
              </div>

            </p>

            {/* The parent of the images being held */}
            <div className="images">
              <div className="top-row">
                <img alt="Wandering Jedi panel image"  src={process.env.PUBLIC_URL + "/img/contact/wanderjedi.png"} />
                <img alt="The flintstones panel image" src={process.env.PUBLIC_URL + "/img/contact/fred-harp.gif"} />
              </div>
              
              <img alt="Firefly panel image" className="bottom"  src={process.env.PUBLIC_URL + "/img/contact/firefly.png"} />

            </div>
          </div>
        </div>

      </div>

    </>
  );
}