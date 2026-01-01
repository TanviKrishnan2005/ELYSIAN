import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { usePostReviewMutation } from '../../../redux/features/reviews/reviewsApi';

const PostAReview = ({ isModelOpen, handleClose }) => {
  const { id } = useParams();

  // ✅ EXACT match to your authSlice
  const user = useSelector((state) => state.auth.user);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview, { isLoading }] = usePostReviewMutation();

  const handleRating = (value) => {
    setRating(Number(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 
    if (!rating || !comment.trim()) {
      alert('All fields are required');
      return;
    }

    const newComment = {
      Comment: comment.trim(),
      rating,
      userId: user.id,
      productId: id,
    };

    try {
      await postReview(newComment).unwrap();
      alert('Comment posted successfully!');
      setComment('');
      setRating(0);
      refetch();
      handleClose();
    } catch (error) {
      alert(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${
        isModelOpen ? 'block' : 'hidden'
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded-md shadow-lg w-96 z-50'
      >
        <h2 className='text-lg font-medium mb-4'>POST A REVIEW</h2>

        {/* ⭐ Rating */}
        <div className='flex items-center mb-4'>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className='cursor-pointer text-yellow-500 text-2xl'
            >
              {rating >= star ? (
                <i className='ri-star-fill'></i>
              ) : (
                <i className='ri-star-line'></i>
              )}
            </span>
          ))}
        </div>

        {/* 📝 Comment */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows='4'
          placeholder='Write your review...'
          className='w-full border border-gray-300 p-2 rounded-md mb-4'
        />

        {/* 🔘 Buttons */}
        <div className='flex justify-end gap-2'>
          <button
            type='button'
            onClick={handleClose}
            className='px-4 py-2 bg-gray-300 rounded-md'
          >
            Cancel
          </button>

          <button
            type='submit'
            disabled={isLoading || !user}
            className='px-4 py-2 bg-red-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {/* Optional helper */}
        {!user && (
          <p className='text-sm text-gray-500 mt-2'>
            Loading user...
          </p>
        )}
      </form>
    </div>
  );
};

export default PostAReview;
