import React, { Fragment, useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Rate, Image } from 'antd';

import './Card.css';
import { postRated } from '../../ApiService/ApiService';
import { Context } from '../../Context/Context';

const Cards = ({ item }) => {
  const [stars, setStars] = useState(0);
  const genres = useContext(Context);
  const rating = 0;
  const genresID = item.genre_ids;
  const id = item.id;

  function getStars(id) {
    const ratedMovies = JSON.parse(sessionStorage.getItem('ratedMovie') || '{}');
    setStars(ratedMovies[id]);
  }

  const itemGrade = (grade) => {
    let gradeClass = 'card_description__grade';
    if (grade < 3) {
      gradeClass += ' card_description__grade_low';
    } else if (grade >= 3 && grade < 5) {
      gradeClass += ' card_description__grade_medium';
    } else if (grade >= 5 && grade < 7) {
      gradeClass += ' card_description__grade_high';
    } else if (grade >= 7) {
      gradeClass += ' card_description__grade_veryHigh';
    }
    return gradeClass;
  };

  useEffect(() => {
    if (rating) setStars(rating);
    if (!rating) getStars(id);
  }, []);

  const imgUrl = `https://image.tmdb.org/t/p/w500//${item.poster_path}`;
  const description = item.overview.replace(/^(.{150}[^\s]*).*/, '$1');
  const formatDate = item.release_date
    ? format(new Date(item.release_date), 'MMMM dd, yyyy')
    : 'Дата выхода неизвестна';
  const allGenres = genres.genres;
  const movieGenre = allGenres
    .filter((data) => {
      return genresID.includes(data.id);
    })
    .map((data) => data.name);

  return (
    <Fragment>
      <li className="card">
        <Image src={imgUrl} height="100%" />
        <div className="card_description">
          <div className="card_description__wrapper">
            <div className="card_description--top-wrapper">
              <p className="card_description__title">{item.title}</p>
              <div className={itemGrade(item.vote_average)}>
                <span>{item.vote_average.toFixed(1)}</span>
              </div>
            </div>
            <p className="card_description__date">{formatDate}</p>
            <div className="card_description__genres">
              <ul>
                {movieGenre.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
            <p>{description}</p>
          </div>
          <div className="card_description__stars">
            <Rate
              count={10}
              allowHalf
              allowClear={false}
              defaultValue={0}
              value={stars}
              onChange={(star) => {
                setStars(star);
                postRated(id, sessionStorage.getItem('sessionID'), star);
                const ratedMovies = JSON.parse(sessionStorage.getItem('ratedMovie') || '{}');
                sessionStorage.setItem('ratedMovie', JSON.stringify({ ...ratedMovies, [id]: star }));
              }}
            />
          </div>
        </div>
      </li>
    </Fragment>
  );
};

export default Cards;
