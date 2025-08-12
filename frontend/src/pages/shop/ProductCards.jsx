import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../../components/RatingStars';

const ProductCards = ({ products = [] }) => {
  return (
    <div className="product__grid">
      {products.map((product, index) => (
        <div
          key={product?.id ?? index}
          className="product__card group border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="relative overflow-hidden rounded-lg">
            {/* Product Image */}
            <Link to={`/shop/${product.id}`}>
              <img
                src={product.image}
                alt={product.title || 'product image'}
                className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Cart Button */}
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-red-600 p-2 text-white hover:bg-blue-800 rounded-full shadow-lg">
                <i className="ri-shopping-cart-2-line text-lg"></i>
              </button>
            </div>
          </div>

          {/* Product Title */}
          <div className=" text-center">
            <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
          </div>
          {/* product description */}
          <div className='product__card__content'>
            <h4>{product.name}</h4>
            <p>{product.price} {product.oldPrice ? <s>{product?.oldPrice}</s>:null}</p>
            <RatingStars rating={product.rating}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
