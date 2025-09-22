import React from 'react';
import commentorIcon from "../../../assets/avatar.png";
import formatDate from '../../../utils/formatDate';
import RatingStars from '../../../components/RatingStars';

const ReviewsCard = ({ reviews }) => {
  const reviewsList = Array.isArray(reviews) ? reviews : [];

  return (
    <div className='my-6 bg-white p-8 rounded shadow'>
      {reviewsList.length > 0 ? (
        <div>
          <h3 className='text-lg font-medium mb-4'>All comments...</h3>
          <div className='flex flex-col gap-6'>
            {reviewsList.map((review, index) => (
              <div
                key={index}
                className='flex items-start gap-4 bg-gray-50 p-6 rounded'
              >
                {/* Left Section: Avatar + Details */}
                <div className="flex flex-col items-center min-w-[100px]">
                  <img
                    src={commentorIcon}
                    alt="avatar"
                    className='w-12 h-12 rounded-full object-cover mb-1'
                  />
                  <p className='text-sm font-medium text-blue-500 underline underline-offset-2'>
                    {review?.userId?.username || "Anonymous"}
                  </p>
                  <p className='text-xs italic text-gray-500'>
                    {formatDate(review?.updatedAt)}
                  </p>
                  <div className="mt-1">
                    <RatingStars rating={review?.rating} />
                  </div>
                </div>

                {/* Right Section: Comment */}
                <div className='flex-1 text-gray-800'>
                  <div className='border p-4 rounded bg-white'>
                    <p>{review?.Comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className='text-gray-500'>No reviews yet</p>
      )}
    </div>
  );
};

export default ReviewsCard;
