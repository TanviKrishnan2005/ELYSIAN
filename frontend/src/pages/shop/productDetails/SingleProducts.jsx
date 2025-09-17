import React from 'react';
import { Link, useParams } from 'react-router-dom'; // ✅ make sure useParams is imported
import RatingStars from '../../../components/RatingStars';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import ReviewsCard from '../reviews/ReviewsCard';
const SingleProductsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { data, error, isLoading } = useFetchProductByIdQuery(id, { skip: !id });

    // Use a single variable for the product
    const product = data?.product || {};
    const reviews = data?.reviews || [];

    console.log(reviews);

    if (!id) return <p>Product ID is missing</p>;
    if (isLoading) return <p>Loading product...</p>;
    if (error) return <p>Error loading product</p>;
    if (!product._id) return <p>Product not found</p>; // extra safety

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
                        <RatingStars rating={product.rating } />
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="btn-primary mt-4 px-4 py-2 bg-red-600 text-white rounded"
                    >
                        Add to cart
                    </button>
                </div>
            </section>

            {/* display review */}
            <section className='section__cointainer mt-8'>
                <ReviewsCard productReviews={reviews} />

            </section>
        </>
    );
};

export default SingleProductsPage;
