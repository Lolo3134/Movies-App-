import React from 'react';

import './Card.css';

const Card = ({ item }) => {
  return (
    <li className="card">
      <div className="card_img">
        <img src="../i" width="183" height="279" />
      </div>
      <div className="card_description">
        <div className="card_description--top-wrapper">
          <p className="card_description__title">{item.title}</p>
          <div className="card_description__grade">6.6</div>
        </div>
        <p className="card_description__date">March 5, 2020 </p>
        <div className="card_description__genres">
          <ul>
            <li>Action</li>
            <li>Drama</li>
          </ul>
        </div>
        <p className="card_description__content">
          A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
          attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high...
        </p>
        <div className="card_description__stars">stars</div>
      </div>
    </li>
  );
};

export default Card;
