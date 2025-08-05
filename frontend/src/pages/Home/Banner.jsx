import React from 'react'
import { Link } from 'react-router-dom'
import bannerImg from "../../assets/header.png"
const Banner = () => {
  return (
    <div className='section__container header__container'>
        <div className='header__content'>
            <h4 className='uppercase'>UP TO 20% Discount on</h4>
            <h1>WOMENS WEAR!</h1>
            <p>Stay ahead of the style game with our exclusive fashion picks. 
                From chic outfits to must have accessories, we’ve got everything to elevate your wardrobe and express your vibe.</p>
                <button className='btn'><Link to ='/shop'></Link>EXPLORE NOW</button>
        </div>
        <div className='header__image'>
            <img src={bannerImg} alt="banner img" />
        </div>
    </div>
    
  )
}

export default Banner