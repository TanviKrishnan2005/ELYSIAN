import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RatingStars from '../../../components/RatingStars';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/features/cart/cartSlice';

const SingleProducts = () => {
  const { id } = useParams(); // get id from URL
  const dispatch = useDispatch();

  // ✅ Skip API call if id is undefined
  const { data, error, isLoading } = useFetchProductByIdQuery(id, { skip: !id });
  console.log(data);

  if (!id) return <p>Product ID is missing</p>; // safety
  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Error loading product</p>;

  const product = data?.product;
  const review = data?.review || [];

  if (!product) return <p>Product not found</p>; // extra safety

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <section className="section__container" style={{ backgroundColor: '#f4e5ec' }}>
        <h2 className="section__header capitalize">{product.name}</h2>
        <div className="section__subheader flex gap-2 mt-2 justify-center">
          <Link to="/">Home</Link> &gt; <Link to="/shop">Shop</Link> &gt; {product.name}
        </div>
      </section>

      <section className="section__container mt-8 flex gap-8">
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-96 object-cover rounded"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
          <p className="text-xl text-primary mb-2">
            ${product.price} {product.oldPrice && <s>{product.oldPrice}</s>}
          </p>
          <p className="text-gray-400 mb-4">{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Color:</strong> {product.color}</p>
          <div className="flex items-center gap-2">
            <strong>Rating:</strong>
            <RatingStars rating={product.rating || 0} />
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-primary mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Add to cart
          </button>
        </div>
      </section>

      <section className="section__container mt-8">
        <h3 className="text-xl font-semibold mb-2">Reviews</h3>
        {review.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          review.map((r) => (
            <div key={r._id} className="border p-2 rounded mb-2">
              <p><strong>{r.userId?.username}</strong>: {r.comment}</p>
              <RatingStars rating={r.rating} />
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default SingleProducts;
