import React from 'react'
import { Link, useParams } from 'react-router-dom'
import RatingStars from '../../../components/RatingStars';

const SingleProducts = () => {
    const { id } = useParams();

    return (
        <>
            {/* Breadcrumb / Header Section */}
            <section className="section__container" style={{ backgroundColor: '#f4e5ec' }}>
                <h2 className="section__header capitalize">Single Item</h2>
                <div className="section__subheader" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <span className="text-primary-hover"><Link to="/">Home</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className="text-primary-hover"><Link to="/shop">Shop</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className="text-primary-hover">Product Name</span>
                </div>
            </section>

            {/* Product Detail Section */}
            <section className="section__container mt-8">
                <div className="product-detail-wrapper">

                    {/* Left: Product Image */}
                    <div className="product-image-wrapper">
                        <img
                            src="https://images.unsplash.com/photo-1512201078372-9c6b2a0d528a?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Product"
                            className="product-image"
                        />
                    </div>

                    {/* Right: Product Details */}
                    <div className="product-details">
                        <h3 className="text-2xl font-semibold mb-4">Product Name</h3>

                        {/* Price */}
                        <p className="text-xl text-primary mb-2">
                            $100 <s className="text-gray-500 text-base">$130</s>
                        </p>

                        {/* Product Description */}
                        <p className="text-gray-400 mb-4">This is product description</p>

                        {/* Additional Info */}
                        <div className="space-y-1">
                            <p><strong>Category:</strong> Accessories</p>
                            <p><strong>Color:</strong> Beige</p>
                            <div className="flex items-center gap-2">
                                <strong>Rating:</strong>
                                <RatingStars rating="4" />
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button className="btn-primary mt-4">Add to cart</button>
                    </div>

                </div>
            </section>
        </>
    )
}

export default SingleProducts;
