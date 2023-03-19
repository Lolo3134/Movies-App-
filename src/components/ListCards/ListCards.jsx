import React, { useState, useEffect } from 'react';

import './ListCards.css';
import Card from '../Card/Card';
import ApiService from '../ApiService/ApiService';

const ListCards = () => {
  const [items, setItems] = useState([]);

  async function getMovies() {
    const data = await ApiService.getPopularMovies(1);
    setItems(data);
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <ul className="cards">
      {items.map((item) => {
        return <Card item={item} key={item.id} />;
      })}
    </ul>
  );
};

export default ListCards;
