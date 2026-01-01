import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import ProductCards from '../shop/ProductCards';

const CategoryPage = () => {
  const { categoryName } = useParams();

  const { data, isLoading, error } = useFetchAllProductsQuery({
    category: categoryName,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  const products = data?.products || [];

  return (
    <>
      <section
        className="section__container"
        style={{ backgroundColor: '#f4e5ec' }}
      >
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          Browse a diverse range of categories from chic dresses to versatile accessories
        </p>
      </section>

      <div className="section__container">
        <ProductCards products={products} />
      </div>
    </>
  );
};

export default CategoryPage;
