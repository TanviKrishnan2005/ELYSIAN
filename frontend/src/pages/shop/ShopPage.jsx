import React, { useEffect, useState } from 'react'
import productsData from '../../data/products.json'
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import { current } from '@reduxjs/toolkit';
const filter = {
  categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
  colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
  priceRange: [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50-$100', min: 50, max: 100 },
    { label: '$100-$200', min: 100, max: 200 },
    { label: '$200 and above', min: 200, max: Infinity },

  ]
};
const ShopPage = () => {

  const [filterState, setFiltersState] = useState({
    category: 'all',
    color: 'all',
    priceRange: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const { category, color, priceRange } = filterState;
  const [minPrice, maxPrice] = priceRange.split('-').map(Number);

  const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: isNaN(minPrice) ? '' : minPrice,
    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    page: currentPage,
    limit: productsPerPage,
  })



  // clear the filter
  const clearFilters = () => {
    setFiltersState({
      category: 'all',
      color: 'all',
      priceRange: ''
    })
  }

  // handle page change
  const handlePageChnage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  if (isLoading) return <div>Loading....</div>
  if (error) return <div>Error loading product</div>

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

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
              Showing {startProduct} to {endProduct} of {totalProducts} products
            </h3>
            <ProductCards products={products} />

            {/* pagination control */}
            <div className='mt-6 flex justify-center'>
              <button 
              disable = {currentPage === 1}
              onClick={() => handlePageChnage(currentPage - 1)}
              className='px-4 bg-gray-300 text-gray-700 rounded-md mr-2'>Previous</button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChnage(index + 1)}
                  className={`px-4 py-2 border rounded mx-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                    }rounded-md mx-1`}
                >{index + 1}</button>
              ))}


              <button 
              disable = {currentPage === totalPages}
              onClick={() => handlePageChnage(currentPage + 1)}
                className='px-4 bg-gray-300 text-gray-700 rounded-md ml-2'>Next</button>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default ShopPage