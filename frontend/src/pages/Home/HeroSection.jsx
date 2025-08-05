import React from 'react';
import card1 from "../../assets/card-1.png";
import card2 from "../../assets/card-2.png";
import card3 from "../../assets/card-3.png";

const cards = [
  {
    id: 1,
    image: card1,
    trends: '2025 trends',
    title: 'Shirts'
  },
  {
    id: 2,
    image: card2,
    trends: '2025 trends',
    title: 'Dresses'
  },
  {
    id: 3,
    image: card3,
    trends: '2025 trends',
    title: 'Casual'
  },
];

const HeroSection = () => {
  return (
    <section className='section__container hero__container'>
      {cards.map((card) => (
        <div key={card.id} className='hero__card'>
          <img src={card.image} alt={card.title} />
          <div className='hero__content'>
            <p>{card.trends}</p>
            <h4>{card.title}</h4>
            <a href="#">Discover More</a>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSection;
