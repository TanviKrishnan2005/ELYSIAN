import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import products from "../../data/products.json";
import ProductCards from '../shop/ProductCards';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProduct, setFilteredProducts] = useState([]);

  useEffect(() => {
    console.log("Category from URL:", categoryName); // Debugging

    // Filter by category (case-insensitive)
    const filtered = products.filter(
      (item) => item.category.toLowerCase() === categoryName.toLowerCase()
    );

    console.log("Filtered products:", filtered); // Debugging
    setFilteredProducts(filtered);
  }, [categoryName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

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

      {/* product cards */}
      <div className="section__container">
        <ProductCards products={filteredProduct} />
      </div>
    </>
  );
};

export default CategoryPage;
