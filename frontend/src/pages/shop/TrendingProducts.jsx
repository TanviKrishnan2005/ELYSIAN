import React, { useState } from 'react';
import ProductCards from './ProductCards';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const { data, isLoading, error } = useFetchAllProductsQuery({
    limit: visibleProducts,
  });

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 4);
  };

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  const products = data?.products || [];

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Hot Picks</h2>
      <p className="section__subheader mb-12">
        Your shortcut to the season’s favorites.
      </p>

      {/* Product cards */}
      <div className="mt-12">
        <ProductCards products={products} />
      </div>

      {/* Load more */}
      <div className="product__btn">
        {products.length >= visibleProducts && (
          <button className="btn" onClick={loadMoreProducts}>
            LOAD MORE!
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
