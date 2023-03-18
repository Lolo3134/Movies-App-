import React from 'react';

import './ListCards.css';
import Card from '../Card/Card';
import ApiService from '../ApiService/ApiService';

const ListCards = ({ items }) => {
  return (
    <ul className="cards">
      {items.map((id, ...item) => {
        <Card key={id} item={item} />;
      })}
      <ApiService />
    </ul>
  );
};

export default ListCards;
