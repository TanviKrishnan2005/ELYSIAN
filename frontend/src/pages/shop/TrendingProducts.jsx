import React ,{useState}from 'react'
import ProductCards from './ProductCards'

import products from "../../data/products.json"
const TrendingProducts = () => {
    const [VisibleProducts,setVisibleProducts]=useState(8);
    const loadMoreProducts =()=>{
        setVisibleProducts(prevCount => prevCount + 4)
    }
  return (
    <section className='section__container product__container'>
        <h2 className='section__header'>Hot Picks</h2>
        <p className='section__subheader mb-12'>Your shortcut to the season’s favorites.</p>


    {/* product crads */}
    <div className='mt-12'><ProductCards products={products}/></div>
    {/* load more */}
    <div> 

    </div>
    </section>
  )
}

export default TrendingProducts