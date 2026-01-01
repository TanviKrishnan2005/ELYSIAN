import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../../components/RatingStars';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const ProductCards = ({ products = [] }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <div className="product__grid">
      {products.map((product) => {
        const productId = product._id || product.id;
        if (!productId) return null;

        return (
          <Link
            key={productId}
            to={`/shop/${productId}`}
            className="product__card group border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-transform duration-300"
              />

              {/* Add to cart */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="bg-red-600 p-2 text-white hover:bg-blue-800 rounded-full shadow-lg"
                >
                  <i className="ri-shopping-cart-2-line text-lg"></i>
                </button>
              </div>
            </div>

            <div className="text-center mt-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p>
                ${product.price}{' '}
                {product.oldPrice && <s>{product.oldPrice}</s>}
              </p>
              <RatingStars rating={product.rating || 0} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductCards;
