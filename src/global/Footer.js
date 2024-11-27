import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import data from '../products.json';

const Footer = () => {
  return (
    <footer className="footer">
        {/* Have the silver k gallery name */}
        {/* Then location row and then the phone number with their respective icons */}
        {/* Then have a contact us with an arrow and then a events button and then a 'see products' with the arrow */}
        {/* Then beneath that have the opening hours */}

        <div className='top'>
          <div className='left'>
            <h3>silver k gallery</h3>

          {/* The row of the lcoation and the phone number with the icons */}
            <div className='link-row'>
              <a href='/' className='loc'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="rgb(150, 150, 150)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="rgb(150, 150, 150)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                1092 High St, Armadale
              </a>

              <a href='/' className='loc'>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <path d="M2.00589 4.54166C1.905 3.11236 3.11531 2 4.54522 2H7.60606C8.34006 2 9.00207 2.44226 9.28438 3.1212L10.5643 6.19946C10.8761 6.94932 10.6548 7.81544 10.0218 8.32292L9.22394 8.96254C8.86788 9.24798 8.74683 9.74018 8.95794 10.1448C10.0429 12.2241 11.6464 13.9888 13.5964 15.2667C14.008 15.5364 14.5517 15.4291 14.8588 15.0445L15.6902 14.003C16.1966 13.3687 17.0609 13.147 17.8092 13.4594L20.8811 14.742C21.5587 15.0249 22 15.6883 22 16.4238V19.5C22 20.9329 20.8489 22.0955 19.4226 21.9941C10.3021 21.3452 2.65247 13.7017 2.00589 4.54166Z" fill="rgb(120, 120, 120)"/>
                </svg>

                (03) 9509-5577
              </a>

            </div>

            {/* Website info */}
            <div className='link-row'>
              <Link to={"/events"}  className='lin'>
                Events

                <svg style={{ marginTop: "1px"}} xmlns="http://www.w3.org/2000/svg" width="30px" height="20px" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="var(--gradientTo)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              <Link to={"/contactus"} className='lin'>
                Contact Us

                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="20px" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="var(--gradientTo)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              
              </Link>

              <Link to={"/collection"} className='lin'>
                See our collection

                <svg style={{ marginTop: "1px"}} xmlns="http://www.w3.org/2000/svg" width="30px" height="20px" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="var(--gradientTo)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              
              </Link>
            </div>
          </div>

          <div className='right'>
            {/* here is where we have the themes */}
            {Object.keys(data).map((category, key) => {
              return (
                <ul key={key}>
                  <h4>{category}</h4>

                  {Object.keys(data[category]).map((theme, key) => {
                    return (
                      <li key={key}>
                        <Link to={`/collection/${category}/${theme}`}>{theme.replace("-", " ")}</Link>
                      </li>
                    );
                  })}
                </ul>
              );
            })}          

          </div>

        </div>

        {/* Timings underneath here */}
        <ul>
          <h4>Opening Hours</h4>

          <li>
            <span>Monday-Tuesday</span> &ensp;Closed
          </li>

          <li>
            <span>Wednesday-Friday</span> &ensp;10am - 5.30pm
          </li>

          <li>
            <span>Saturday</span> &ensp;10.30am - 5.30pm
          </li>

          <li>
            <span>Sunday</span> &ensp;11.30am - 5.30pm
          </li>

        </ul>


        {/* Then have a divider and then on the right and on this side list all of the themes of each category  */}

        {/* underneath all of above have another divider and then have the privacy policy link, the copyright mention, and then anyting other legal info */}
        

        {/* For the legal stuff with privacy policy link and then the copyright mention */}
        <div className='legal'>
          <div className='copyright'>
            COPYRIGHT 1997-2025 © silver k fine art 
          </div>
          
          <Link to={"/privacy-policy"}>privacy policy</Link>
        </div>


    </footer>
  );
};

export default Footer;