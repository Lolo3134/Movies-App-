import React from 'react';
import { format } from 'date-fns';

import './Card.css';

const Card = ({ item }) => {
  const imgUrl = `https://image.tmdb.org/t/p/w500//${item.poster_path}`;
  const description = item.overview.replace(/^(.{195}[^\s]*).*/, '$1');
  const date = item.release_date.replace(/-/gm, ', ');
  const formatDate = format(new Date(date), 'MMMM dd, yyyy');

  return (
    <li className="card">
      <div className="card_img">
        <img src={imgUrl} width="183" height="279" />
      </div>
      <div className="card_description">
        <div className="card_description--top-wrapper">
          <p className="card_description__title">{item.title}</p>
          <div className="card_description__grade">
            <span>{item.vote_average}</span>
          </div>
        </div>
        <p className="card_description__date">{formatDate}</p>
        <div className="card_description__genres">
          <ul>
            <li>Action</li>
            <li>Drama</li>
          </ul>
        </div>
        <p className="card_description__content">{description}</p>
        <div className="card_description__stars">stars</div>
      </div>
    </li>
  );
};

export default Card;
