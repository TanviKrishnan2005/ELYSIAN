import React, { useEffect, useState } from 'react'
import productsData from '../../data/products.json'
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';

const filter ={
    categories:['all','accessories','dress','jewellery','cosmetics'],
    colors : ['all','black','red','gold','blue','silver','beige','green'],
    priceRange :[
        {label:'Under $50',min:0,max:50},
        {label:'$50-$100',min:50,max:100},
        {label:'$100-$200',min:100,max:200},
        {label:'$200 and above',min:200,max:Infinity},
        
    ]
};
const ShopPage = () => {
    
    const [filterState,setFiltersState] = useState({
        category:'all',
        color:'all',
        priceRange:''
    });

    const [currentPage,setCurrentPage]=useState(1);
  
   

    // clear the filter
    const clearFilters=()=>{
        setFiltersState({
        category:'all',
        color:'all',
        priceRange:''
        })
    }

    return (
        <>

            <section
                className="section__container"
                style={{ backgroundColor: '#f4e5ec' }}
            >
                <h2 className="section__header capitalize">Shop Page</h2>
                <p className="section__subheader">
                    GO GET TO SHOPPING!
                </p>
            </section>

            <section 
  style={{
    width: "100%", 
    maxWidth: "1200px", 
    margin: "0 auto", 
    padding: "1rem"
  }}
>
  <div 
    style={{
      display: "flex",
      flexDirection: "row", 
      gap: "3rem" 
    }}
  >
    {/* left side */}
    <ShopFiltering filters={filter} 
    filtersState={filterState} 
    setFiltersState={setFiltersState} 
    clearFilters={clearFilters}
    />

    {/* right side */}
    <div>
      <h3 
        style={{
          fontSize: "1.25rem", 
          fontWeight: "500", 
          marginBottom: "1rem"
        }}
      >
        Products Available: {products.length}
      </h3>
      <ProductCards products={products}/>
    </div>
  </div>
</section>

        </>
    )
}

export default ShopPage