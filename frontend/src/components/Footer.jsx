import React from 'react';
import instaImg1 from "../assets/instagram-1.jpg";
import instaImg2 from "../assets/instagram-2.jpg";
import instaImg3 from "../assets/instagram-3.jpg";
import instaImg4 from "../assets/instagram-4.jpg";
import instaImg5 from "../assets/instagram-5.jpg";
import instaImg6 from "../assets/instagram-6.jpg";


const Footer = () => {
  return (
    <>
    <footer className='section__container footer__container'>
      <div className='footer__col'>
        <h4>Contact info</h4>
        <p>
          <span>
            <i className='ri-map-pin-2-fill'></i>
          </span>
          123, New Delhi
        </p>
        <p>
          <span>
            <i className='ri-mail-fill'></i>
          </span>
          Elysian@gmail.com
        </p>
        <p>
          <span>
            <i className='ri-phone-fill'></i>
            +91 78645687973
          </span>
        </p>
      </div>

      <div className='footer__col'>
        <h4>COMPANY</h4>
        <a href="/">HOME</a>
        <a href="/">ABOUT US</a>
        <a href="/">WORK WITH US</a>
        <a href="/">OUR BLOGS</a>
        <a href="/">TERMS AND CONDITION</a>
      </div>

      <div className='footer__col'>
        <h4>USEFUL LINK</h4>
        <a href="/">Help</a>
        <a href="/">Track your order</a>
        <a href="/">Men</a>
        <a href="/">Women</a>
        <a href="/">Dresses</a>
      </div>

      <div className='footer__col'>
        <h4>INSTAGRAM</h4>
        <div className='instagram__grid'>
            <img src={instaImg1} alt="" />
            <img src={instaImg2} alt="" />
            <img src={instaImg3} alt="" />
            <img src={instaImg4} alt="" />
            <img src={instaImg5} alt="" />
            <img src={instaImg6} alt="" />
        </div>
      </div>
    </footer>

    <div className='footer__bar' >
            Copyright © 2025 by Elysian .All rights reserved
    </div>
    </>
  );
}  

export default Footer;
