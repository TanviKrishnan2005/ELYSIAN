import React from 'react';

const RatingStars = ({ rating = 0 }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`ri-star${i <= rating ? '-fill text-yellow-400' : '-line text-gray-300'} text-xl`}
      ></span>
    );
  }

  return (
    <div className="product__rating flex justify-center items-center gap-1">
      {stars}
    </div>
  );
};

export default RatingStars;
