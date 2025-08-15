import React from 'react'
import Banner from './Banner'
import Categories from './Categories'
import HeroSection from './HeroSection'
import TrendingProducts from '../shop/TrendingProducts'
import DealSection from './DealSection'
import PromoBanner from './PromoBanner'
import Blogs from '../blogs/Blogs'
import Search from '../search/Search'

const Home = () => {
  return (
    <>
    <Banner/>
    <Categories/>
    <HeroSection/>
    <TrendingProducts/>
    <DealSection/>
    <PromoBanner/>
    <Blogs/>
   
    </>
  )
}

export default Home