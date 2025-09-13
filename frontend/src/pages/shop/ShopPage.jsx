import React, { useState } from 'react';
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const filterOptions = {
  categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
  colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
  priceRange: [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50-$100', min: 50, max: 100 },
    { label: '$100-$200', min: 100, max: 200 },
    { label: '$200 and above', min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [filterState, setFiltersState] = useState({
    category: 'all',
    color: 'all',
    priceRange: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const { category, color, priceRange } = filterState;

  // ✅ Handle empty priceRange safely
  const [minPrice, maxPrice] = priceRange
    ? priceRange.split('-').map(Number)
    : [0, Infinity];

  const { data, error, isLoading } = useFetchAllProductsQuery({
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: minPrice || 0,
    maxPrice: isFinite(maxPrice) ? maxPrice : '',
    page: currentPage,
    limit: productsPerPage,
  });

  // ✅ Safe destructuring
  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;
  const totalProducts = data?.totalProducts || 0;

  // Debug
  console.log('Products:', products);

  const clearFilters = () => {
    setFiltersState({ category: 'all', color: 'all', priceRange: '' });
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products</div>;

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
    <>
      <section className="section__container" style={{ backgroundColor: '#f4e5ec' }}>
        <h2 className="section__header capitalize">Shop Page</h2>
        <p className="section__subheader">GO GET TO SHOPPING!</p>
      </section>

      <section style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '3rem' }}>
          {/* Left: Filters */}
          <ShopFiltering
            filters={filterOptions}
            filtersState={filterState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />

          {/* Right: Products */}
          <div className="flex-1">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem' }}>
              Showing {startProduct} to {endProduct} of {totalProducts} products
            </h3>

            <ProductCards products={products} />

            {/* Pagination */}
            <div className="mt-6 flex justify-center items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 bg-gray-300 text-gray-700 rounded-md"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === index + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 bg-gray-300 text-gray-700 rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
